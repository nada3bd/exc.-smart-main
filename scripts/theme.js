/* FILENAME: scripts/theme.js */

export function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const html = document.documentElement;

    const saved = localStorage.getItem('theme');
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    // Apply saved preference, or default to system preference
    if (saved === 'dark' || (!saved && mq.matches)) {
        html.classList.add('dark');
        updateIcon(true);
    } else {
        html.classList.remove('dark');
        updateIcon(false);
    }

    // If user hasn't explicitly chosen a theme, follow OS changes
    if (!saved) {
        try {
            mq.addEventListener('change', (e) => {
                if (e.matches) {
                    html.classList.add('dark');
                    updateIcon(true);
                } else {
                    html.classList.remove('dark');
                    updateIcon(false);
                }
            });
        } catch (err) {
            // Fallback for older browsers
            mq.addListener((e) => {
                if (e.matches) {
                    html.classList.add('dark');
                    updateIcon(true);
                } else {
                    html.classList.remove('dark');
                    updateIcon(false);
                }
            });
        }
    }

    toggleBtn.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcon(isDark);
    });
}

function updateIcon(isDark) {
    const icon = document.getElementById('theme-icon');
    icon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}