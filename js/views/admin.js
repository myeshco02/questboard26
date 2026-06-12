import { api } from '../api.js';
import { render, diffBadge, toast } from '../utils.js';

export async function adminView() {
    const queue = await api.getReviewQueue();

    render(`
        <div class="view-header">
            <h1>Panel Weryfikacji</h1>
            <p>Questy oczekujące na zatwierdzenie (${queue.length})</p>
        </div>
        ${queue.length === 0
            ? '<div class="empty-state">Brak questów do weryfikacji.</div>'
            : `<div class="review-list">
                ${queue.map(q => `
                    <div class="review-card">
                        <div class="review-header">
                            <div>
                                <div class="review-title">${q.icon ?? ''} ${q.title}</div>
                                <div class="review-meta">
                                    ${diffBadge(q.diff)} ·
                                    Drużyna: ${(q.party ?? []).map(p => p.name).join(', ')}
                                </div>
                            </div>
                            <span class="status-badge status-InReview">Do weryfikacji</span>
                        </div>
                        <div style="font-size:12px;color:var(--text-dim);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.4rem">Raport wykonania</div>
                        <div class="report-box">${q.report ?? 'Brak raportu.'}</div>
                        <div class="review-actions">
                            <button class="btn-approve" data-id="${q.id}">✓ Zatwierdź</button>
                            <button class="btn-reject"  data-id="${q.id}">✗ Odrzuć</button>
                        </div>
                    </div>`).join('')}
               </div>`}
    `);

    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', async () => {
            await api.reviewQuest(parseInt(btn.dataset.id), true, null);
            toast('Quest zatwierdzony! Nagrody wypłacone.');
            adminView();
        });
    });

    document.querySelectorAll('.btn-reject').forEach(btn => {
        btn.addEventListener('click', async () => {
            const reason = prompt('Podaj powód odrzucenia:');
            if (reason) {
                await api.reviewQuest(parseInt(btn.dataset.id), false, reason);
                toast('Quest odrzucony.');
                adminView();
            }
        });
    });
}
