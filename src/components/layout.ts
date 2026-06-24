
const BASE = import.meta.env.BASE_URL

const NAV_LINKS = [
  { href: BASE,               label: 'Home',     match: /^\/($|index\.html)/ },
  { href: `${BASE}about/`,    label: 'About',    match: /^\/about/ },
  { href: `${BASE}skills/`,   label: 'Skills',   match: /^\/skills/ },
  { href: `${BASE}projects/`, label: 'Projects', match: /^\/projects/ },
  { href: `${BASE}contact/`,  label: 'Contact',  match: /^\/contact/ },
]

export function injectLayout() {
  // Scan beam
  const beam = document.createElement('div')
  beam.className = 'scan-beam'
  document.body.appendChild(beam)

  // CRT scanlines
  const lines = document.createElement('div')
  lines.className = 'scanlines'
  document.body.appendChild(lines)

  // Header
  const header = document.createElement('header')
  header.className = 'navbar'
  header.innerHTML = `
    <div class="container nav-container">
      <a href="${BASE}" class="nav-logo" style="text-decoration:none;">
        <span class="text-accent">surya</span><span class="text-success">@devops</span><span style="color:var(--text-secondary)">:~$</span><span class="cursor-blink"></span>
      </a>
      <nav class="nav-links" id="nav-links">
        ${NAV_LINKS.map(l => `<a href="${l.href}" class="nav-link">${l.label}</a>`).join('')}
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </div>
  `
  document.body.insertBefore(header, document.body.firstChild)

  // Hamburger
  const hamburger = document.getElementById('hamburger')
  const navLinks  = document.getElementById('nav-links')
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open')
    navLinks?.classList.toggle('mobile-open')
  })
  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open')
      navLinks.classList.remove('mobile-open')
    })
  })

  // Footer
  const footer = document.createElement('footer')
  footer.innerHTML = `
    <div class="container">
      <p style="font-family:var(--font-mono);letter-spacing:0.05em;opacity:0.55;">
        © ${new Date().getFullYear()} <span style="color:var(--cyan);">PV Surya Teja</span> &nbsp;·&nbsp; Cloud Engineer
      </p>
    </div>
  `
  document.body.appendChild(footer)

  highlightActiveLink()
}

function highlightActiveLink() {
  const rawPath = window.location.pathname
  let path = rawPath.replace(BASE, '/')
  if (!path.startsWith('/')) path = '/' + path

  NAV_LINKS.forEach(link => {
    if (link.match.test(path)) {
      const el = document.querySelector(`.nav-link[href="${link.href}"]`) as HTMLAnchorElement
      if (el) el.classList.add('active')
    }
  })
}
