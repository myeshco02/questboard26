import { api } from '../api.js';
import { render, toast } from '../utils.js';

export async function shopView() {
    renderPage('');
}

async function renderPage(type) {
    // Dane o bohaterze tylko do wyświetlenia — logika zakupu jest w API
    const [items, me] = await Promise.all([api.getItems(type || undefined), api.getMe()]);

    render(`
        <div class="view-header">
            <h1>Sklep Handlarzy</h1>
            <p>Twoje złoto: <span style="color:var(--gold);font-weight:600">💰 ${me.gold}</span>
               · Miejsca w ekwipunku: ${me.inventory.length}/5</p>
        </div>
        <div class="filters">
            <select id="f-type">
                <option value="">Wszystkie typy</option>
                <option value="Weapon"   ${type==='Weapon'   ?'selected':''}>Broń</option>
                <option value="Armor"    ${type==='Armor'    ?'selected':''}>Zbroja</option>
                <option value="Talisman" ${type==='Talisman' ?'selected':''}>Talizman</option>
            </select>
        </div>
        <div class="shop-grid">
            ${items.map(item => `
                <div class="item-card">
                    <div class="item-icon">${item.icon}</div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-type">${typeLabel(item.type)}</div>
                    <div class="item-desc">${item.desc}</div>
                    <div class="item-footer">
                        <span class="item-price">💰 ${item.value}</span>
                        <button class="buy-btn" data-id="${item.id}" data-name="${item.name}">Kup</button>
                    </div>
                </div>`).join('')}
        </div>
    `);

    document.getElementById('f-type').value = type;
    document.getElementById('f-type').addEventListener('change', e => renderPage(e.target.value));

    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            try {
                await api.buyItem(parseInt(btn.dataset.id));
                toast(`Zakupiono: ${btn.dataset.name}!`);
                renderPage(type);
            } catch (err) {
                // Backend zwraca 400 gdy za mało złota, pełny ekwipunek lub item już posiadany
                toast(err.message ?? 'Nie można kupić tego itemu.');
            }
        });
    });
}

function typeLabel(t) {
    return { Weapon: 'Broń', Armor: 'Zbroja', Talisman: 'Talizman' }[t] ?? t;
}
