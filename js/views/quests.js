import { api } from '../api.js';
import { navigate } from '../router.js';
import { render, diffBadge, diffColor, regionName } from '../utils.js';

export async function questsView() {
    // Filtry resetują się przy każdym wejściu w widok
    renderPage('', '');
}

async function renderPage(diff, regionId) {
    // Filtry przekazywane do API (mock lub backend — bez różnicy)
    const quests = await api.getQuests({
        difficulty: diff     || undefined,
        regionId:   regionId || undefined,
    });

    render(`
        <div class="view-header">
            <h1>Tablica Questów</h1>
            <p>Otwarte zlecenia czekają na odważnych bohaterów</p>
        </div>
        <div class="filters">
            <select id="f-diff">
                <option value="">Wszystkie trudności</option>
                <option value="Easy"   ${diff==='Easy'   ?'selected':''}>Łatwe</option>
                <option value="Medium" ${diff==='Medium' ?'selected':''}>Średnie</option>
                <option value="Hard"   ${diff==='Hard'   ?'selected':''}>Trudne</option>
            </select>
            <select id="f-region">
                <option value="">Wszystkie regiony</option>
                <option value="1">Mroczny Las</option>
                <option value="2">Górskie Przełęcze</option>
                <option value="3">Nawiedzony Zamek</option>
                <option value="4">Dolina Mgieł</option>
                <option value="5">Spalone Pustkowia</option>
                <option value="6">Zielony Las</option>
            </select>
        </div>
        <div class="quest-grid">
            ${quests.length === 0
                ? '<div class="empty-state">Brak questów spełniających kryteria.</div>'
                : quests.map(questCard).join('')}
        </div>
    `);

    // Po każdej zmianie filtrów — nowe zapytanie (do API lub mocka)
    document.getElementById('f-diff').value    = diff;
    document.getElementById('f-region').value  = regionId;

    document.getElementById('f-diff').addEventListener('change', e =>
        renderPage(e.target.value, document.getElementById('f-region').value));
    document.getElementById('f-region').addEventListener('change', e =>
        renderPage(document.getElementById('f-diff').value, e.target.value));

    document.querySelectorAll('.quest-card').forEach(card =>
        card.addEventListener('click', () => navigate('#quest/' + card.dataset.id)));
}

function questCard(q) {
    return `
        <div class="quest-card" data-id="${q.id}" style="--diff-color:${diffColor(q.diff)}">
            <div class="quest-card-header">
                <div class="quest-title">${q.icon ?? ''} ${q.title}</div>
                ${diffBadge(q.diff)}
            </div>
            <div class="quest-desc">${q.desc}</div>
            <div class="quest-meta">
                <span class="reward">💰 ${q.reward} zł</span>
                <span class="region">📍 ${regionName(q.regionId)}</span>
                <span>⚔ Min. lvl ${q.minLvl}</span>
                ${q.reqClass ? `<span>📜 ${q.reqClass}</span>` : ''}
            </div>
        </div>
    `;
}
