/* FILENAME: scripts/router.js */

export function initRouter(startCanvasCallback, stopCanvasCallback, startEventsCanvasCallback, stopEventsCanvasCallback) {
  const container = document.getElementById("app-container");
  
  if (!container) {
    console.error("app-container not found. Router initialization failed.");
    return;
  }

  window.router.navigate = async (pageId) => {
    // Fade out
    container.style.opacity = "0";

    setTimeout(async () => {
      try {
        // CRITICAL: Requires Local Server (e.g. Live Server)
        const response = await fetch(`pages/${pageId}.html`);
        if (!response.ok) throw new Error("Page not found");
        const html = await response.text();

        // Inject
        container.innerHTML = html;

        // Notify other modules that a new page was loaded
        try { window.dispatchEvent(new Event('page:loaded')); } catch (e) { /* ignore */ }

        // Handle page-specific initialization
        if (pageId === "team") {
          // Dynamically import and initialize team page
          // Use requestAnimationFrame to ensure DOM is ready
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
        } else if (pageId === "events") {
          stopCanvasCallback();
          startEventsCanvasCallback();
        } else {
          stopCanvasCallback();
          stopEventsCanvasCallback();
        }

        // Fade in
        setTimeout(() => {
          container.style.opacity = "1";
          window.scrollTo(0, 0);
        }, 50);
      } catch (err) {
        console.error("Error loading page:", err);
        container.innerHTML = `<div class="p-10 text-center text-red-500">Error loading ${pageId}.html.<br><br><small>Are you running this on a local server? (e.g. VS Code Live Server)</small></div>`;
        container.style.opacity = "1";
      }
    }, 300);
  };

  // Load home page by default
  window.router.navigate("home");
}
