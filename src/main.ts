import './style.css'
import { injectLayout } from './components/layout'

injectLayout()
createParticleCanvas()
initTypewriter()
initScrollReveal()
initCounters()
initCardTilt()
initMagneticButtons()

console.log('%c surya@devops:~$ System Online ✓', 'color:#00d4ff;background:#030610;padding:8px 14px;border-radius:4px;font-weight:bold;font-size:13px;')

/* ═══════════════════ PARTICLES ═══════════════════ */
function createParticleCanvas() {
  const canvas = document.createElement('canvas')
  canvas.id = 'particle-canvas'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let mouseX = -1000, mouseY = -1000
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY })

  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
  resize()
  window.addEventListener('resize', resize)

  interface P { x:number; y:number; vx:number; vy:number; size:number; opacity:number; pulse:number; ps:number; hue:number }

  const COUNT = window.innerWidth < 768 ? 30 : 70
  const pts: P[] = []

  for (let i = 0; i < COUNT; i++) {
    pts.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.45 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.02 + 0.008,
      hue: Math.random() < 0.82 ? 195 : 265,
    })
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
        const d = Math.sqrt(dx*dx + dy*dy)
        if (d < 155) {
          const h = (pts[i].hue + pts[j].hue) / 2
          ctx.beginPath()
          ctx.strokeStyle = `hsla(${h},100%,62%,${0.06*(1-d/155)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.stroke()
        }
      }
    }

    for (const p of pts) {
      p.pulse += p.ps
      const op = p.opacity * (0.65 + 0.35 * Math.sin(p.pulse))

      // mouse repulsion
      const mdx = p.x - mouseX, mdy = p.y - mouseY
      const md = Math.sqrt(mdx*mdx + mdy*mdy)
      if (md < 110 && md > 0) {
        const f = (110 - md) / 110 * 0.45
        p.vx += (mdx / md) * f
        p.vy += (mdy / md) * f
      }
      const spd = Math.sqrt(p.vx*p.vx + p.vy*p.vy)
      if (spd > 1.4) { p.vx *= 0.94; p.vy *= 0.94 }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2)
      ctx.fillStyle = `hsla(${p.hue},100%,65%,${op})`
      ctx.fill()

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI*2)
      ctx.fillStyle = `hsla(${p.hue},100%,65%,${op*0.06})`
      ctx.fill()

      p.x += p.vx; p.y += p.vy
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0
    }

    requestAnimationFrame(draw)
  }
  draw()
}

/* ═══════════════════ TYPEWRITER ═══════════════════ */
function initTypewriter() {
  const el = document.getElementById('typed-role')
  if (!el) return

  const roles = ['Cloud Engineer', 'K8s Operator', 'DevOps Engineer', 'Infrastructure Dev']
  let ri = 0, ci = 0, deleting = false

  const type = () => {
    const cur = roles[ri]
    el.textContent = deleting ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1)
    ci += deleting ? -1 : 1

    if (!deleting && ci > cur.length) { deleting = true; setTimeout(type, 2200); return }
    if (deleting && ci < 0)           { deleting = false; ci = 0; ri = (ri + 1) % roles.length }

    setTimeout(type, deleting ? 45 : 95)
  }
  type()
}

/* ═══════════════════ SCROLL REVEAL ═══════════════════ */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('.reveal-on-scroll').forEach(el => obs.observe(el))
}

/* ═══════════════════ COUNTERS ═══════════════════ */
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target as HTMLElement)
        obs.unobserve(e.target)
      }
    })
  }, { threshold: 0.5 })

  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el))
}

function animateCounter(el: HTMLElement) {
  const target  = parseFloat(el.dataset.count   || '0')
  const suffix  = el.dataset.suffix  || ''
  const decimal = el.dataset.decimal === 'true'
  const dur     = 2000
  const t0      = performance.now()

  const tick = (now: number) => {
    const p = Math.min((now - t0) / dur, 1)
    const e = 1 - Math.pow(1 - p, 3)
    const v = e * target
    el.textContent = (decimal ? v.toFixed(1) : Math.floor(v).toString()) + suffix
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* ═══════════════════ 3D CARD TILT ═══════════════════ */
function initCardTilt() {
  document.querySelectorAll<HTMLElement>('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect()
      const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -6
      const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  6
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`
    })
    card.addEventListener('mouseleave', () => { card.style.transform = '' })
  })
}

/* ═══════════════════ MAGNETIC BUTTONS ═══════════════════ */
function initMagneticButtons() {
  document.querySelectorAll<HTMLElement>('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width  / 2) * 0.18
      const y = (e.clientY - r.top  - r.height / 2) * 0.18
      btn.style.transform = `translate(${x}px, ${y}px) translateY(-3px)`
    })
    btn.addEventListener('mouseleave', () => { btn.style.transform = '' })
  })
}
