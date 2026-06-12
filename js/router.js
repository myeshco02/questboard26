const routes = {};

export function register(hash, handler) {
    routes[hash] = handler;
}

export function navigate(hash) {
    location.hash = hash;
}

export function start() {
    async function handle() {
        const raw   = location.hash || '#quests';
        const parts = raw.slice(1).split('/');     // '#quest/3' → ['quest', '3']
        const base  = '#' + parts[0];              // '#quest'
        const param = parts[1] ? decodeURIComponent(parts[1]) : null;

        // Oznacz aktywny link w nav
        document.querySelectorAll('.nav-link').forEach(el => {
            el.classList.toggle('active', el.dataset.link === base);
        });

        const handler = routes[base];
        if (handler) {
            await handler(param);
        } else {
            await (routes['#quests'] ?? (() => {}))();
        }
    }

    window.addEventListener('hashchange', handle);
    handle();   // obsłuż stan początkowy
}
