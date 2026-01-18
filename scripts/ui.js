
let animId = null;

async function includePartials(root = document) {
  const targets = Array.from(root.querySelectorAll('[data-include]'));
  if (!targets.length) return;

  await Promise.all(targets.map(async (el) => {
    const path = el.getAttribute('data-include');
    if (!path) return;

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      el.innerHTML = await res.text();
    } catch (e) {
      console.error('Partial include failed:', path, e);
      el.innerHTML = `<div class="p-4 rounded-lg bg-red-50 text-red-700">Failed to load: ${path}</div>`;
    }
  }));
}

export function initUI() {
  loadComponents();

  window.addEventListener('page:loaded',  () => includePartials(document));


}

async function loadComponents() {
  // 1. Load Navbar
  const navbarContainer = document.getElementById("navbar-container");
  if (navbarContainer) {
    try {
      const navbarRes = await fetch("components/navbar.html");
      const navbarHtml = await navbarRes.text();
      navbarContainer.innerHTML = navbarHtml;
    } catch (e) {
      console.error("Failed to load navbar", e);
    }
  }

  // 2. Load Footer
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    try {
      const footerRes = await fetch("components/footer.html");
      const footerHtml = await footerRes.text();
      footerContainer.innerHTML = footerHtml;
    } catch (e) {
      console.error("Failed to load footer", e);
    }
  }

  // 3. Now that HTML is injected, attach event listeners
  attachEventListeners();

  includePartials(document);
  // 4. Initialize theme after navbar is loaded
  initThemeAfterLoad();

  // 5. Start Loader Animation removal
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => (loader.style.display = "none"), 500);
    }, 1000);
  }
}

function attachEventListeners() {
  // Mobile Menu
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  window.ui.toggleMobileMenu = () => {
    menu.classList.toggle("hidden");
  };

  if (btn) {
    btn.addEventListener("click", window.ui.toggleMobileMenu);
  }

  // Modal content definitions (shared across all instances)
  const MODAL_CONTENT = {
    workflow: {
      title: 'AI Workflow Automation Tools',
      menu1: ['Automated data extraction and analysis', 'Intelligent triage and routing systems', 'Predictive workload and resource management', 'Real-time dashboard integrations'],
      menu2: ['Supports faster decision-making with automated insights', 'Improves accuracy and response time', 'Reduces manual effort and operational costs']
    },
    enterprise: {
      title: 'Enterprise AI Platforms',
      menu1: ['Custom AI model development', 'Real-time analytics engines', 'Integration with existing enterprise systems','Cloud and on-premise deployment options'],
      menu2: ['Helps organizations transition to smarter, data-driven operations', 'Increases efficiency and reduces errors', 'Scales easily as business needs grow']
    },
    custom: {
      title: 'Custom AI & IT Solutions',
      menu1: ['AI model customization for medical or business use', 'Mobile and web application development', 'IT infrastructure design and optimization','Digital transformation strategy and implementation'],
      menu2: ['Fully personalized solutions', 'Seamless integration', 'Optimized performance and long-term reliability']
    },
    saleem: {
      title: 'Saleem Care – Medical AI Diagnostic System',
      menu1: ['AI-Based Symptom Analysis: Detects clinical patterns and suggests the most likely diagnostic paths','Medical Decision Support:Provides evidence-based insights to help clinicians make faster and safer decisions', 'User-Friendly Mobile App: Allows individuals to evaluate symptoms and receive tailored health guidance.', 'Continuous Learning Models: The system improves over time using new medical knowledge and validated updates', 'Secure and Compliant Data Handling: Built with strong privacy and security protocols for medical environments'],
      menu2: ['Optimizes workflow and reduces unnecessary visits', 'Improves patient engagement and understanding', 'Supports physicians with quick, reliable insights', 'Enhances accuracy in early detection','Reduces diagnostic delays']
    }
  };

  // Global modal control functions
  function openLearnMoreModal(id) {
    const modal = document.getElementById('learn-more-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const section1Title = document.getElementById('modal-section-1-title');
    const section2Title = document.getElementById('modal-section-2-title');
    const menu1 = document.getElementById('modal-menu-1-items');
    const menu2 = document.getElementById('modal-menu-2-items');

    if (!modal) {
      console.warn('Learn More modal not found');
      return;
    }

    const info = MODAL_CONTENT[id] || MODAL_CONTENT['custom'];
    if (modalTitle) modalTitle.textContent = info.title;
    
    // Set subtitle and section headings based on card title
    const isCustom = info.title === 'Custom AI & IT Solutions';
    if (modalSubtitle) {
      modalSubtitle.textContent = isCustom 
        ? 'Explore the capabilities and benefits of our custom solutions'
        : 'Discover the key features and benefits of this solution';
    }
    if (section1Title) {
      section1Title.textContent = isCustom ? 'Capabilities' : 'Key Features';
    }
    if (section2Title) {
      section2Title.textContent = 'Benefits';
    }
    
    // Style list items with icons and better formatting for longer text
    if (menu1) {
      menu1.innerHTML = info.menu1.map(item => `
        <li class="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-ai-500 dark:hover:border-ai-500 transition-all group">
          <div class="w-6 h-6 rounded-full bg-ai-100 dark:bg-ai-900/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-ai-200 dark:group-hover:bg-ai-900/50 transition-colors">
            <i class="fa-solid fa-check text-ai-600 dark:text-ai-400 text-xs"></i>
          </div>
          <span class="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium flex-1">${item}</span>
        </li>
      `).join('');
    }
    
    if (menu2) {
      menu2.innerHTML = info.menu2.map(item => `
        <li class="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500 transition-all group">
          <div class="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-sky-200 dark:group-hover:bg-sky-900/50 transition-colors">
            <i class="fa-solid fa-circle-check text-sky-600 dark:text-sky-400 text-xs"></i>
          </div>
          <span class="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium flex-1">${item}</span>
        </li>
      `).join('');
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = modal.querySelector('.relative');
    if (modalContent) {
      modalContent.style.opacity = '0';
      modalContent.style.transform = 'scale(0.95) translateY(10px)';
      setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease-out';
        modalContent.style.opacity = '1';
        modalContent.style.transform = 'scale(1) translateY(0)';
      }, 10);
    }
  }

  function closeLearnMoreModal() {
    const modal = document.getElementById('learn-more-modal');
    if (modal) {
      const modalContent = modal.querySelector('.relative');
      if (modalContent) {
        modalContent.style.transition = 'all 0.2s ease-in';
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'scale(0.95) translateY(10px)';
      }
      setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
        if (modalContent) {
          modalContent.style.opacity = '';
          modalContent.style.transform = '';
          modalContent.style.transition = '';
        }
      }, 200);
    }
  }

  // Expose globally
  window.openLearnMoreModal = openLearnMoreModal;
  window.closeLearnMoreModal = closeLearnMoreModal;
  
  // Contact form submission handler
  window.handleFormSubmit = async function(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('opacity-75', 'cursor-not-allowed');
    
    try {
      // Get form data
      const formData = new FormData(form);
      
      // Submit to FormSubmit.co
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        // Show success message
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.classList.remove('opacity-75', 'bg-ai-600', 'hover:bg-ai-700');
        submitButton.classList.add('bg-green-600', 'hover:bg-green-700');
        
        // Reset form after 3 seconds
        setTimeout(() => {
          form.reset();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          submitButton.classList.remove('bg-green-600', 'hover:bg-green-700', 'cursor-not-allowed');
          submitButton.classList.add('bg-ai-600', 'hover:bg-ai-700');
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      // Show error message
      submitButton.textContent = 'Error - Try Again';
      submitButton.classList.remove('opacity-75', 'bg-ai-600', 'hover:bg-ai-700');
      submitButton.classList.add('bg-red-600', 'hover:bg-red-700');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.classList.remove('bg-red-600', 'hover:bg-red-700', 'cursor-not-allowed');
        submitButton.classList.add('bg-ai-600', 'hover:bg-ai-700');
      }, 3000);
    }
  };

  // Use event delegation as a fallback for dynamically loaded content
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.learn-more-btn');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.modalId || btn.getAttribute('data-modal-id') || 'custom';
      console.log('Learn More button clicked (via delegation), opening modal with id:', id);
      openLearnMoreModal(id);
    }
  });

  // Learn More Modal Setup - runs on initial load and after router page injections
  async function setupLearnMoreModal() {
    try {
      // Inject modal component if it doesn't exist
      if (!document.getElementById('learn-more-modal')) {
        const res = await fetch('components/learn-more-modal.html');
        if (!res.ok) {
          console.warn('Learn More modal component not found');
          return;
        }
        const html = await res.text();
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper.firstElementChild);
      }

      const modal = document.getElementById('learn-more-modal');
      const closeBtn = document.getElementById('modal-close');
      const closeBtn2 = document.getElementById('modal-close-2');
      const overlay = document.querySelector('[data-modal-close]');

      if (!modal) {
        console.warn('Learn More modal elements not found');
        return;
      }

      // Setup close button listeners (remove old and add new to ensure they work)
      if (closeBtn) {
        // Remove any existing listeners by cloning
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
        document.getElementById('modal-close').addEventListener('click', closeLearnMoreModal);
      }
      if (closeBtn2) {
        const newCloseBtn2 = closeBtn2.cloneNode(true);
        closeBtn2.parentNode.replaceChild(newCloseBtn2, closeBtn2);
        document.getElementById('modal-close-2').addEventListener('click', closeLearnMoreModal);
      }
      if (overlay) {
        const newOverlay = overlay.cloneNode(true);
        overlay.parentNode.replaceChild(newOverlay, overlay);
        document.querySelector('[data-modal-close]').addEventListener('click', closeLearnMoreModal);
      }

      // Setup Escape key listener (only once globally)
      if (!window._learnMoreEscapeAttached) {
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            const modal = document.getElementById('learn-more-modal');
            if (modal && !modal.classList.contains('hidden')) {
              closeLearnMoreModal();
            }
          }
        });
        window._learnMoreEscapeAttached = true;
      }

      // Programmatically add Learn More buttons if not present in HTML
      const cardTitles = {
        'AI Workflow Automation Tools': 'workflow',
        'Enterprise AI Platforms': 'enterprise',
        'Custom AI & IT Solutions': 'custom'
      };

      document.querySelectorAll('.group').forEach(card => {
        const h = card.querySelector('h4');
        if (!h) return;
        const id = cardTitles[h.textContent.trim()];
        if (!id) return;
        if (!card.querySelector('.learn-more-btn')) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'learn-more-btn mt-4 inline-block bg-ai-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-ai-500 transition-colors';
          btn.textContent = 'Learn More';
          btn.setAttribute('data-modal-id', id);
          const p = card.querySelector('p');
          if (p) p.insertAdjacentElement('afterend', btn);
          else card.appendChild(btn);
        }
      });

      // Ensure all Learn More buttons have type="button" attribute
      document.querySelectorAll('.learn-more-btn').forEach(btn => {
        if (!btn.hasAttribute('type')) {
          btn.setAttribute('type', 'button');
        }
      });

    } catch (e) {
      console.warn('Learn More modal setup failed', e);
    }
  }

  // Run on initial load
  setupLearnMoreModal();

  // Re-run when router injects a new page
  document.addEventListener('page:loaded', () => {
    setupLearnMoreModal();
  });
}

export function initThemeAfterLoad() {
  const toggleBtn = document.getElementById("theme-toggle");
  const html = document.documentElement;

  if (!toggleBtn) {
    console.warn("Theme toggle button not found");
    return;
  }

  // Use saved preference or system preference
  const saved = localStorage.getItem("theme");
  const mq = window.matchMedia("(prefers-color-scheme: dark)");

  if (saved === "dark" || (!saved && mq.matches)) {
    html.classList.add("dark");
    updateThemeIcon(true);
  } else {
    html.classList.remove("dark");
    updateThemeIcon(false);
  }

  // If user hasn't explicitly chosen a theme, follow OS changes
  if (!saved) {
    try {
      mq.addEventListener('change', (e) => {
        if (e.matches) {
          html.classList.add('dark');
          updateThemeIcon(true);
        } else {
          html.classList.remove('dark');
          updateThemeIcon(false);
        }
      });
    } catch (err) {
      mq.addListener((e) => {
        if (e.matches) {
          html.classList.add('dark');
          updateThemeIcon(true);
        } else {
          html.classList.remove('dark');
          updateThemeIcon(false);
        }
      });
    }
  }

  toggleBtn.addEventListener("click", () => {
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon(isDark);
  });
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.className = isDark ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }
}

export function startCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const html = document.documentElement;
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.fillStyle = html.classList.contains("dark")
        ? "rgba(255,255,255,0.5)"
        : "rgba(13, 148, 136, 0.5)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(window.innerWidth / 10, 100);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          const isDark = html.classList.contains("dark");
          ctx.strokeStyle = isDark
            ? `rgba(255,255,255,${0.1 - dist / 1500})`
            : `rgba(13,148,136,${0.15 - dist / 1500})`;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}

export function stopCanvas() {
  if (animId) {
    cancelAnimationFrame(animId);
    animId = null;
  }
}

let eventsAnimId = null;
let eventsContentAnimId = null;

export function startEventsCanvas() {
  // Header canvas animation
  const headerCanvas = document.getElementById("events-canvas");
  if (headerCanvas) {
    const ctx = headerCanvas.getContext("2d");
    const html = document.documentElement;
    let width, height;
    let headerParticles = [];

    function resizeHeader() {
      const header = headerCanvas.parentElement;
      if (header) {
        width = headerCanvas.width = header.offsetWidth;
        height = headerCanvas.height = header.offsetHeight;
      }
    }
    window.addEventListener("resize", resizeHeader);
    resizeHeader();

    class HeaderParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 3 + 1.5;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initHeaderParticles() {
      headerParticles = [];
      const count = Math.min(width / 15, 80);
      for (let i = 0; i < count; i++) headerParticles.push(new HeaderParticle());
    }

    function animateHeader() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < headerParticles.length; i++) {
        headerParticles[i].update();
        headerParticles[i].draw();
        for (let j = i + 1; j < headerParticles.length; j++) {
          const dx = headerParticles[i].x - headerParticles[j].x;
          const dy = headerParticles[i].y - headerParticles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.15 - dist / 1200})`;
            ctx.lineWidth = 1;
            ctx.moveTo(headerParticles[i].x, headerParticles[i].y);
            ctx.lineTo(headerParticles[j].x, headerParticles[j].y);
            ctx.stroke();
          }
        }
      }
      eventsAnimId = requestAnimationFrame(animateHeader);
    }

    initHeaderParticles();
    animateHeader();
  }

  // Content area canvas animation (floating orbs)
  const contentCanvas = document.getElementById("events-content-canvas");
  if (contentCanvas) {
    const ctx = contentCanvas.getContext("2d");
    const html = document.documentElement;
    let width, height;
    let orbs = [];

    function resizeContent() {
      const container = contentCanvas.parentElement;
      if (container) {
        width = contentCanvas.width = container.offsetWidth;
        height = contentCanvas.height = container.offsetHeight;
      }
    }
    window.addEventListener("resize", resizeContent);
    resizeContent();

    class Orb {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 60 + 40;
        this.baseOpacity = Math.random() * 0.1 + 0.05;
        this.time = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.02 + 0.01;
      }
      update() {
        this.time += this.speed;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1;
      }
      draw() {
        const isDark = html.classList.contains("dark");
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        const opacity = this.baseOpacity + Math.sin(this.time) * 0.05;
        const color1 = isDark 
          ? `rgba(99, 102, 241, ${opacity})` 
          : `rgba(13, 148, 136, ${opacity})`;
        const color2 = isDark 
          ? `rgba(99, 102, 241, 0)` 
          : `rgba(13, 148, 136, 0)`;
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initOrbs() {
      orbs = [];
      const count = 6;
      for (let i = 0; i < count; i++) orbs.push(new Orb());
    }

    function animateContent() {
      ctx.clearRect(0, 0, width, height);
      for (let orb of orbs) {
        orb.update();
        orb.draw();
      }
      eventsContentAnimId = requestAnimationFrame(animateContent);
    }

    initOrbs();
    animateContent();
  }
}

export function stopEventsCanvas() {
  if (eventsAnimId) {
    cancelAnimationFrame(eventsAnimId);
    eventsAnimId = null;
  }
  if (eventsContentAnimId) {
    cancelAnimationFrame(eventsContentAnimId);
    eventsContentAnimId = null;
  }
}
