/* FILENAME: scripts/router.js */

export function initRouter(startCanvasCallback, stopCanvasCallback, startEventsCanvasCallback, stopEventsCanvasCallback) {
  const container = document.getElementById("app-container");
  
  if (!container) {
    console.error("app-container not found. Router initialization failed.");
    return;
  }

  // --- Hash Routing Support (works anywhere, even without server rewrites) ---
  let isUpdatingHash = false;

  const getPageFromHash = () => {
    const raw = (window.location.hash || "").replace(/^#/, "").trim();
    return raw || "home";
  };

  window.router.navigate = async (pageId, options = {}) => {
    const { updateHash = true, replace = false } = options;

    // Keep URL in sync with the loaded page (so refresh stays on same page)
    if (updateHash) {
      const nextHash = `#${pageId}`;
      if (window.location.hash !== nextHash) {
        isUpdatingHash = true;
        if (replace) history.replaceState(null, "", nextHash);
        else window.location.hash = nextHash;
        setTimeout(() => (isUpdatingHash = false), 0);
      }
    }

    // Fade out
    container.style.opacity = "0";

    setTimeout(async () => {
      try {
        const response = await fetch(`pages/${pageId}.html`);
        if (!response.ok) throw new Error("Page not found");
        const html = await response.text();

        // Inject
        container.innerHTML = html;

        // Notify other modules that a new page was loaded
        try { window.dispatchEvent(new Event('page:loaded')); } catch (e) { /* ignore */ }

        // Handle page-specific initialization
        if (pageId === "team") {
          import('./team.js').then(module => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                module.renderTeamPage();
              });
            });
          }).catch(err => console.error('Failed to load team module:', err));
        }

        // Handle Canvas Logic
        if (pageId === "home") {
          stopEventsCanvasCallback();
          startCanvasCallback();
          container.style.minHeight = '';
          container.style.height = '';
        } else if (pageId === "events") {
          stopCanvasCallback();
          startEventsCanvasCallback();
          container.style.minHeight = 'auto';
          container.style.height = 'auto';
        } else {
          stopCanvasCallback();
          stopEventsCanvasCallback();
          container.style.minHeight = '';
          container.style.height = '';
        }

        // Fade in
        setTimeout(() => {
          container.style.opacity = "1";
          window.scrollTo(0, 0);
        }, 50);
      } catch (err) {
        console.error("Error loading page:", err);
        container.innerHTML = `<div class="p-10 text-center text-red-500">Error loading ${pageId}.html.</div>`;
        container.style.opacity = "1";
      }
    }, 300);
  };

  // Back/forward + direct hash links
  window.addEventListener("hashchange", () => {
    if (isUpdatingHash) return;
    const pageId = getPageFromHash();
    window.router.navigate(pageId, { updateHash: false });
  });

  // Initial load from hash (so refresh stays on same page)
  const initialPage = getPageFromHash();
  if (!window.location.hash) {
    history.replaceState(null, "", `#${initialPage}`);
  }
  window.router.navigate(initialPage, { updateHash: false, replace: true });
}