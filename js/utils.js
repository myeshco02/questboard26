import { REGIONS } from '../data/mock.js';

// ── Toast ─────────────────────────────────────────────────────
let toastTimer;
export function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ── Region helpers ────────────────────────────────────────────
export function regionName(id) {
    return (REGIONS.find(r => r.id === id) ?? {}).name ?? '?';
}

export function regionById(id) {
    return REGIONS.find(r => r.id === id);
}

// ── Difficulty badge ──────────────────────────────────────────
export function diffBadge(diff) {
    const labels = { Easy: 'Łatwy', Medium: 'Średni', Hard: 'Trudny' };
    return `<span class="diff-badge diff-${diff}">${labels[diff] ?? diff}</span>`;
}

export function diffColor(diff) {
    return diff === 'Easy' ? '#2e7d52' : diff === 'Medium' ? '#c8a84b' : '#c0392b';
}

// ── Status badge ──────────────────────────────────────────────
export function statusBadge(status) {
    const labels = {
        Open: 'Otwarte', InProgress: 'W toku', InReview: 'Do weryfikacji',
        Completed: 'Ukończone', Rejected: 'Odrzucone',
    };
    return `<span class="status-badge status-${status}">${labels[status] ?? status}</span>`;
}

// ── Danger pips ───────────────────────────────────────────────
export function dangerPips(level) {
    let html = '';
    for (let i = 1; i <= 8; i++) {
        let cls = 'pip';
        if (i <= level) cls += level <= 3 ? ' low' : level <= 6 ? ' medium' : ' high';
        html += `<div class="${cls}"></div>`;
    }
    return html;
}

// ── Render helper ─────────────────────────────────────────────
export function render(html) {
    document.getElementById('app').innerHTML = html;
}
