
const BASE = import.meta.env.BASE_URL;

const NAV_LINKS = [
  { href: BASE, label: 'Home', match: /^\/($|index\.html)/ },
  { href: `${BASE}about/`, label: 'About', match: /^\/about/ },
  { href: `${BASE}skills/`, label: 'Skills', match: /^\/skills/ },
  { href: `${BASE}projects/`, label: 'Projects', match: /^\/projects/ },
  { href: `${BASE}contact/`, label: 'Contact', match: /^\/contact/ },
];

export function injectLayout() {
  const app = document.querySelector<HTMLDivElement>('#app') || document.body;
  if (!app) return;

  const header = document.createElement('header');
  header.className = 'navbar';
  header.innerHTML = `
    <div class="container nav-container">
      <a href="${BASE}" class="nav-logo">
        <span class="text-accent">surya</span><span class="text-success">@devops</span><span style="color:var(--text-secondary)">:~$</span><span class="cursor-blink"></span>
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

  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="container">
      <p style="opacity:0.6; font-family:var(--font-mono); letter-spacing:0.05em;">
        © ${new Date().getFullYear()} <span style="color:var(--accent-cyan);">Surya</span> &nbsp;·&nbsp; DevOps Engineer
      </p>
    </div>
  `;
  document.body.appendChild(footer);

  highlightActiveLink();
}

function highlightActiveLink() {
  const rawPath = window.location.pathname;
  let path = rawPath.replace(BASE, '/');
  if (!path.startsWith('/')) path = '/' + path;

  NAV_LINKS.forEach(link => {
    const isActive = link.match.test(path);
    if (isActive) {
      const el = document.querySelector(`.nav-link[href="${link.href}"]`) as HTMLAnchorElement;
      if (el) el.classList.add('active');
    }
  });
}
