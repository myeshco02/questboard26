import { api } from '../api.js';
import { render } from '../utils.js';

export async function rankingView() {
    const heroes = await api.getRanking();

    const rankMedal = i => ['🥇','🥈','🥉'][i] ?? `${i+1}.`;
    const rankClass = i => ['rank-gold','rank-silver','rank-bronze'][i] ?? '';

    render(`
        <div class="view-header">
            <h1>Ranking Bohaterów</h1>
            <p>Najdzielniejsi awanturnicy gildii — sortowanie po złocie</p>
        </div>
        <table class="ranking-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Bohater</th>
                    <th>Klasa</th>
                    <th>Poziom</th>
                    <th>Ukończone</th>
                    <th>Złoto</th>
                </tr>
            </thead>
            <tbody>
                ${heroes.map((h, i) => `
                    <tr>
                        <td><span class="rank-num ${rankClass(i)}">${rankMedal(i)}</span></td>
                        <td><span class="hero-row-name">${h.icon} ${h.name}</span></td>
                        <td><span class="hero-row-class">${h.cls}</span></td>
                        <td>${h.lvl}</td>
                        <td>${h.completed}</td>
                        <td style="color:var(--gold);font-weight:600">💰 ${h.gold}</td>
                    </tr>`).join('')}
            </tbody>
        </table>
    `);
}
