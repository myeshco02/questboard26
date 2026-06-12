import { api } from '../api.js';
import { render, dangerPips } from '../utils.js';

export async function regionsView() {
    const [regions, events] = await Promise.all([api.getRegions(), api.getAllEvents()]);

    render(`
        <div class="view-header">
            <h1>Regiony</h1>
            <p>Krainy świata i aktywne wydarzenia</p>
        </div>
        <div class="regions-grid">
            ${regions.map(r => {
                const revents = events.filter(e => e.regionId === r.id);
                return `
                    <div class="region-card">
                        <div class="region-header">
                            <div class="region-name">${r.icon} ${r.name}</div>
                            <div class="danger-pips">${dangerPips(r.danger)}</div>
                        </div>
                        <div class="region-desc">${r.desc}</div>
                        ${revents.length > 0
                            ? `<div class="region-events">
                                ${revents.map(e => `
                                    <div class="event-item">
                                        <div class="event-item-title">🎉 ${e.title}${e.bonus > 0 ? ` (+${e.bonus}%)` : ''}</div>
                                        <div class="event-item-desc">${e.desc}</div>
                                    </div>`).join('')}
                               </div>`
                            : '<div class="no-events">Brak aktywnych wydarzeń</div>'}
                    </div>`;
            }).join('')}
        </div>
    `);
}
