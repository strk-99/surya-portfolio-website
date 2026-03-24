
const NAV_LINKS = [
  { href: '/', label: 'Home', match: /^\/($|index.html)/ },
  { href: '/about/', label: 'About', match: /^\/about/ },
  { href: '/skills/', label: 'Skills', match: /^\/skills/ },
  { href: '/projects/', label: 'Projects', match: /^\/projects/ },
  { href: '/contact/', label: 'Contact', match: /^\/contact/ },
];

export function injectLayout() {
  const app = document.querySelector<HTMLDivElement>('#app') || document.body;
  if (!app) return;

  // Header
  const header = document.createElement('header');
  header.className = 'navbar';
  header.innerHTML = `
    <div class="container nav-container">
      <a href="/" class="nav-logo">
        <span class="text-accent">surya</span><span class="text-success">@devops</span>:~$
      </a>
      <nav class="nav-links">
        ${NAV_LINKS.map(link => `
          <a href="${link.href}" class="nav-link" data-path="${link.label}">
            ${link.label}
          </a>
        `).join('')}
      </nav>
    </div>
  `;

  document.body.insertBefore(header, document.body.firstChild);

  // Footer
  const footer = document.createElement('footer');
  footer.style.cssText = 'border-top: 1px solid var(--border-default); padding: 1rem 0; margin-top: auto; text-align: center; color: var(--text-secondary); font-size: 0.8rem;';
  footer.innerHTML = `
    <div class="container">
      <p style="opacity: 0.7;">© ${new Date().getFullYear()} Surya Learning DevOps</p>
    </div>
  `;
  document.body.appendChild(footer);

  // Highlights
  highlightActiveLink();
}

function highlightActiveLink() {
  const path = window.location.pathname;
  NAV_LINKS.forEach(link => {
    // Check if current path matches the link rule
    // Note: Development server might serve /about as /about/ or /about/index.html
    const isActive = link.match.test(path);
    if (isActive) {
      const el = document.querySelector(`.nav-link[href="${link.href}"]`) as HTMLAnchorElement;
      if (el) el.classList.add('active');
    }
  });
}
