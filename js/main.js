import { register, start, navigate } from './router.js';
import { api, getToken, isLoggedIn, clearToken, USE_MOCK } from './api.js';
import { questsView } from './views/quests.js';
import { questDetailView } from './views/questDetail.js';
import { profileView } from './views/profile.js';
import { shopView } from './views/shop.js';
import { regionsView } from './views/regions.js';
import { rankingView } from './views/ranking.js';
import { adminView } from './views/admin.js';
import { loginView } from './views/login.js';

// ── Rejestracja tras ──────────────────────────────────────────
register('#quests', () => questsView());
register('#quest', (id) => questDetailView(id));
register('#profile', () => profileView());
register('#shop', () => shopView());
register('#regions', () => regionsView());
register('#ranking', () => rankingView());
register('#admin', () => adminView());
register('#login', () => loginView());

// ── Nawigacja z nagłówka ──────────────────────────────────────
document.querySelectorAll('[data-link]').forEach((el) => {
    el.addEventListener('click', () => navigate(el.dataset.link));
});

// ── Wylogowanie ───────────────────────────────────────────────
document.getElementById('logout-btn')?.addEventListener('click', () => {
    clearToken();
    updateHeader();
    navigate('#login');
});

// ── Odczyt roli z tokenu JWT ──────────────────────────────────
const ROLE_CLAIM =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

function getRoleFromToken() {
    try {
        const token = getToken();
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload[ROLE_CLAIM] ?? payload['role'] ?? null;
    } catch {
        return null;
    }
}

// ── Widoczność nawigacji zależna od roli ──────────────────────
function updateNav(role) {
    const show = (selector) =>
        document
            .querySelectorAll(selector)
            .forEach((el) => (el.style.display = ''));
    const hide = (selector) =>
        document
            .querySelectorAll(selector)
            .forEach((el) => (el.style.display = 'none'));

    // ukryj wszystko
    hide('[data-link="#profile"]');
    hide('[data-link="#shop"]');
    hide('[data-link="#admin"]');

    if (role === 'Admin') {
        // admin widzi tylko: Questy, Regiony, Ranking, Admin
        show('[data-link="#admin"]');
    } else if (role === 'Hero') {
        // hero widzi: Questy, Profil, Sklep, Regiony, Ranking
        show('[data-link="#profile"]');
        show('[data-link="#shop"]');
    }
    // Questy, Regiony, Ranking — zawsze widoczne (publiczne)
}

// ── Dane bohatera w nagłówku ──────────────────────────────────
async function updateHeader() {
    const logoutBtn = document.getElementById('logout-btn');
    const heroBadge = document.getElementById('hero-badge');

    // mock — pokaż bohatera bez logowania
    if (USE_MOCK) {
        const me = await api.getMe();
        if (me) {
            document.getElementById('header-hero-icon').textContent =
                me.icon ?? '🧙';
            document.getElementById('header-hero-name').textContent = me.name;
            document.getElementById('header-hero-gold').textContent =
                `💰 ${me.gold}`;
            if (heroBadge) heroBadge.style.display = '';
        }
        if (logoutBtn) logoutBtn.style.display = 'none';
        updateNav('Mock');
        return;
    }

    if (!isLoggedIn()) {
        if (heroBadge) heroBadge.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        updateNav(null);
        return;
    }

    const role = getRoleFromToken();
    updateNav(role);

    if (role === 'Admin') {
        // admin nie ma bohatera — pokaż tylko nazwę
        document.getElementById('header-hero-icon').textContent = '⚙';
        document.getElementById('header-hero-name').textContent = 'Admin';
        document.getElementById('header-hero-gold').textContent = '';
        if (heroBadge) heroBadge.style.display = '';
        if (logoutBtn) logoutBtn.style.display = '';
        return;
    }

    try {
        const me = await api.getMe();
        if (!me) throw new Error('no hero');
        document.getElementById('header-hero-icon').textContent = me.icon;
        document.getElementById('header-hero-name').textContent = me.name;
        document.getElementById('header-hero-gold').textContent =
            `💰 ${me.gold}`;
        if (heroBadge) heroBadge.style.display = '';
        if (logoutBtn) logoutBtn.style.display = '';
    } catch {
        clearToken();
        if (heroBadge) heroBadge.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        updateNav(null);
        navigate('#login');
    }
}

// ── Publiczne akcje dostępne z widoków ────────────────────────
window.refreshHeader = updateHeader;

// ── Guard tras wymagających logowania ─────────────────────────
const publicRoutes = ['#login', '#ranking', '#regions'];
const heroOnlyRoutes = ['#profile', '#shop'];
const adminOnlyRoutes = ['#admin'];

function guardedStart() {
    window.addEventListener('hashchange', () => {
        if (USE_MOCK) return; // mock — bez guardu

        const hash = '#' + location.hash.slice(1).split('/')[0];
        const role = getRoleFromToken();

        if (!isLoggedIn() && !publicRoutes.includes(hash)) {
            navigate('#login');
            return;
        }
        if (role === 'Admin' && heroOnlyRoutes.includes(hash)) {
            navigate('#admin');
            return;
        }
        if (role === 'Hero' && adminOnlyRoutes.includes(hash)) {
            navigate('#quests');
            return;
        }
    });
}

// ── Start ─────────────────────────────────────────────────────
if (!USE_MOCK) {
    const currentHash =
        '#' + (location.hash.slice(1).split('/')[0] || 'quests');
    if (!isLoggedIn() && !publicRoutes.includes(currentHash)) {
        location.hash = '#login';
    }
}

guardedStart();
updateHeader();
start();
