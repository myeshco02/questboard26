import { api } from '../api.js';
import { navigate } from '../router.js';
import { render, statusBadge } from '../utils.js';
// dostosowanie do frontu: usunięto import QUESTS z mocka
// poprzednio: import { QUESTS } from '../../data/mock.js';

export async function profileView() {
    const [hero, myQuests] = await Promise.all([
        api.getMe(),
        api.getMyQuests(), // dostosowanie do frontu: zamiast QUESTS z mocka
    ]);
    if (!hero) {
        navigate('#quests');
        return;
    }

    // dostosowanie do frontu: myQuests z API zwraca { id, title, status, regionName }
    // poprzednio: QUESTS.filter(q => (q.party ?? []).some(p => p.name === hero.name))
    const active = (myQuests ?? []).filter((q) =>
        ['Open', 'InProgress', 'InReview', 'Rejected'].includes(q.status),
    );
    const completed = (myQuests ?? []).filter((q) => q.status === 'Completed');

    render(`
        <div class="view-header">
            <h1>Profil Bohatera</h1>
            <p>Twoje statystyki i historia przygód</p>
        </div>
        <div class="profile-grid">

            <div class="profile-card">
                <div class="hero-avatar">${hero.icon}</div>
                <div class="hero-name">${hero.name}</div>
                <div class="hero-subtitle">${hero.cls} · Poziom ${hero.lvl}</div>
                <div class="stat-list">
                    <div class="stat-row"><span class="stat-label">Klasa</span><span class="stat-value">${hero.cls}</span></div>
                    <div class="stat-row"><span class="stat-label">Poziom</span><span class="stat-value">${hero.lvl}</span></div>
                    <div class="stat-row"><span class="stat-label">Złoto</span><span class="stat-value gold">💰 ${hero.gold}</span></div>
                    <div class="stat-row"><span class="stat-label">Ukończone</span><span class="stat-value">${hero.completed}</span></div>
                </div>
            </div>

            <div class="profile-panels">

                <div class="panel">
                    <h3>Ekwipunek (${hero.inventory.length}/5)</h3>
                    <div class="shop-grid">
                        ${hero.inventory
                            .map(
                                (item) => `
                            <div class="item-card">
                                <div class="item-icon">${item.icon}</div>
                                <div class="item-name">${item.name}</div>
                            </div>`,
                            )
                            .join('')}
                        ${Array.from(
                            { length: 5 - hero.inventory.length },
                            () => `
                            <div class="item-card" style="opacity:0.3;pointer-events:none">
                                <div class="item-icon" style="color:var(--border)">·</div>
                                <div class="item-name" style="color:var(--text-dim)">Wolne miejsce</div>
                            </div>`,
                        ).join('')}
                    </div>
                </div>

                <div class="panel">
                    <h3>Aktywne questy</h3>
                    ${
                        active.length === 0
                            ? '<div class="empty-state" style="padding:1rem">Brak aktywnych questów</div>'
                            : `<div class="history-list">
                            ${active
                                .map(
                                    (q) => `
                                <div class="history-item">
                                    <span>${q.title}</span>
                                    ${statusBadge(q.status)}
                                </div>`,
                                )
                                .join('')}
                           </div>`
                    }
                </div>

                <div class="panel">
                    <h3>Historia ukończonych</h3>
                    ${
                        completed.length === 0
                            ? '<div class="empty-state" style="padding:1rem">Brak ukończonych questów</div>'
                            : `<div class="history-list">
                            ${completed
                                .map(
                                    (q) => `
                                <div class="history-item">
                                    <span>${q.title}</span>
                                    ${statusBadge(q.status)}
                                </div>`,
                                )
                                .join('')}
                           </div>`
                    }
                </div>

            </div>
        </div>
    `);
}
