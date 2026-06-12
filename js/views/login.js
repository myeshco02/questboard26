import { api, setToken } from '../api.js';
import { render } from '../utils.js';
import { navigate } from '../router.js';

export async function loginView() {
    render(`
        <div class="view-header">
            <h1>⚔ QuestBoard</h1>
            <p>Zaloguj się by zarządzać questami</p>
        </div>
        <div style="display:flex;justify-content:center;margin-top:2rem">
            <div class="panel" style="width:100%;max-width:400px">
                <h3 style="margin-bottom:1.5rem">Logowanie</h3>
                <div style="display:flex;flex-direction:column;gap:1rem">
                    <input id="login-username" type="text" placeholder="Nazwa użytkownika"
                        style="padding:0.75rem 1rem;border-radius:8px;border:1px solid var(--border);
                               background:var(--bg-card);color:var(--text);font-size:1rem">
                    <input id="login-password" type="password" placeholder="Hasło"
                        style="padding:0.75rem 1rem;border-radius:8px;border:1px solid var(--border);
                               background:var(--bg-card);color:var(--text);font-size:1rem">
                    <div id="login-error"
                        style="color:#e74c3c;font-size:0.9rem;display:none;min-height:1.2em"></div>
                    <button id="login-btn"
                        style="padding:0.75rem;border-radius:8px;border:none;
                               background:var(--gold);color:#1a1a2e;font-weight:700;
                               font-size:1rem;cursor:pointer">
                        Zaloguj się
                    </button>
                </div>
            </div>
        </div>
    `);

    async function doLogin() {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const errorEl = document.getElementById('login-error');

        errorEl.style.display = 'none';

        if (!username || !password) {
            errorEl.textContent = 'Podaj nazwę użytkownika i hasło.';
            errorEl.style.display = 'block';
            return;
        }

        try {
            const { token } = await api.login(username, password);
            setToken(token);
            if (window.refreshHeader) await window.refreshHeader();
            // dostosowanie do frontu: ASP.NET Core używa pełnej nazwy claim dla roli
            const ROLE_CLAIM =
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload[ROLE_CLAIM] ?? payload['role'] ?? 'Hero';
            navigate(role === 'Admin' ? '#admin' : '#quests');
        } catch (err) {
            errorEl.textContent =
                err.status === 401
                    ? 'Nieprawidłowa nazwa użytkownika lub hasło.'
                    : 'Błąd logowania. Spróbuj ponownie.';
            errorEl.style.display = 'block';
        }
    }

    document.getElementById('login-btn').addEventListener('click', doLogin);
    document
        .getElementById('login-password')
        .addEventListener('keydown', (e) => {
            if (e.key === 'Enter') doLogin();
        });
}
