import { api } from '../api.js';
import { navigate } from '../router.js';
import { render, diffBadge, statusBadge, regionById, toast } from '../utils.js';
// dostosowanie do frontu: EVENTS z mocka zastąpione activeEvent z API
// dostosowanie do frontu: CURRENT_HERO_ID zastąpione przez me.name z API
import { EVENTS } from '../../data/mock.js';

const ROLE_CLAIM =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

function getRoleFromToken() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload[ROLE_CLAIM] ?? payload['role'] ?? null;
    } catch {
        return null;
    }
}

export async function questDetailView(idStr) {
    const id = parseInt(idStr);
    const role = getRoleFromToken();

    // dostosowanie do frontu: admin nie ma bohatera — pomijamy getMe żeby uniknąć 403
    // poprzednio: const [quest, me] = await Promise.all([api.getQuest(id), api.getMe()]);
    const quest = await api.getQuest(id);
    const me = role === 'Admin' ? null : await api.getMe().catch(() => null);

    if (!quest) {
        navigate('#quests');
        return;
    }

    const region = regionById(quest.regionId);
    // dostosowanie do frontu: activeEvent z API (quest.activeEvent) zamiast EVENTS z mocka
    const event =
        quest.activeEvent ?? EVENTS.find((e) => e.regionId === quest.regionId);
    const party = quest.party ?? [];
    const isMember = me ? party.some((p) => p.name === me.name) : false;
    const isLeader = me
        ? party.some((p) => p.name === me.name && p.leader)
        : false;
    const canJoin =
        !isMember &&
        quest.status === 'Open' &&
        party.length < 3 &&
        role === 'Hero';

    const effectiveReward =
        event?.bonus > 0
            ? Math.round(quest.reward * (1 + event.bonus / 100))
            : quest.reward;

    render(`
        <button class="back-btn" id="btn-back">← Powrót do tablicy</button>
        <div class="quest-detail">

            <div>
                <div class="panel">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;gap:0.5rem">
                        <h2>${quest.icon ?? ''} ${quest.title}</h2>
                        ${diffBadge(quest.diff)}
                    </div>
                    <p>${quest.desc}</p>

                    <h3>Wymagania</h3>
                    <div class="req-list">
                        <div class="req-item">⚔ Minimalny poziom: <strong>${quest.minLvl}</strong></div>
                        ${quest.reqClass ? `<div class="req-item">📜 Wymagana klasa: <strong>${quest.reqClass}</strong></div>` : ''}
                        <div class="req-item">👥 Rozmiar drużyny: <strong>1–3 bohaterów</strong></div>
                    </div>
                </div>

                <div class="panel">
                    <h3>Drużyna (${party.length}/3)</h3>
                    ${
                        party.length === 0
                            ? '<div class="empty-state" style="padding:1rem">Brak zapisanych bohaterów</div>'
                            : `<div class="party-list">
                            ${party
                                .map(
                                    (p) => `
                                <div class="party-member">
                                    ${p.leader ? '<span class="leader-tag">👑 Lider</span>' : '<span style="color:var(--text-dim);font-size:14px">Członek</span>'}
                                    <span>${p.name}</span>
                                </div>`,
                                )
                                .join('')}
                           </div>`
                    }
                </div>

                <div class="panel">
                    <h3>Region</h3>
                    <div class="req-item">
                        ${region?.icon ?? '📍'} ${region?.name ?? '?'}
                        <span style="color:var(--text-dim);margin-left:0.5rem">· Poziom zagrożenia: ${region?.danger ?? '?'}/8</span>
                    </div>
                </div>

                ${
                    quest.status === 'Rejected' && quest.rejectionReason
                        ? `
                <div class="panel">
                    <h3>Powód odrzucenia</h3>
                    <div class="report-box">${quest.rejectionReason}</div>
                </div>`
                        : ''
                }
            </div>

            <div>
                <div class="panel">
                    <h3>Nagroda</h3>
                    <div class="reward-big">${effectiveReward} <span>złota</span></div>
                    ${
                        event?.bonus > 0
                            ? `
                        <div class="event-box">
                            <div class="event-title">🎉 ${event.title}</div>
                            <div style="color:var(--text-mid);font-size:16px;margin:0.2rem 0">${event.desc}</div>
                            <div class="event-bonus">+${event.bonus}% nagrody</div>
                        </div>`
                            : ''
                    }
                </div>

                <div class="panel">
                    <h3>Status</h3>
                    ${statusBadge(quest.status)}
                </div>

                <div class="panel">
                    <h3>Akcje</h3>
                    ${canJoin ? `<button class="action-btn btn-primary" id="btn-join">Dołącz do questu</button>` : ''}
                    ${isLeader && quest.status === 'Open' ? `<button class="action-btn btn-primary" id="btn-start">⚔ Wyruszamy!</button>` : ''}
                    ${isLeader && quest.status === 'InProgress' ? `<button class="action-btn btn-secondary" id="btn-complete">📜 Zgłoś wykonanie</button>` : ''}
                    ${isMember && !isLeader && quest.status === 'Open' ? `<button class="action-btn btn-danger" id="btn-leave">Opuść quest</button>` : ''}
                    ${!canJoin && !isMember ? `<div style="color:var(--text-dim);font-size:16px">Nie możesz dołączyć do tego questu.</div>` : ''}
                </div>
            </div>

        </div>
    `);

    document
        .getElementById('btn-back')
        ?.addEventListener('click', () => navigate('#quests'));
    document.getElementById('btn-join')?.addEventListener('click', async () => {
        await api.joinQuest(id);
        toast('Dołączono do questu!');
        questDetailView(idStr);
    });
    document
        .getElementById('btn-start')
        ?.addEventListener('click', async () => {
            await api.startQuest(id);
            toast('Quest wystartowany! Wyruszacie!');
            questDetailView(idStr);
        });
    document
        .getElementById('btn-leave')
        ?.addEventListener('click', async () => {
            await api.leaveQuest(id);
            toast('Opuściłeś quest.');
            navigate('#quests');
        });
    document.getElementById('btn-complete')?.addEventListener('click', () => {
        const report = prompt('Opisz wykonanie questu:');
        if (report) {
            api.completeQuest(id, report);
            toast('Raport wysłany do weryfikacji!');
            questDetailView(idStr);
        }
    });
}
