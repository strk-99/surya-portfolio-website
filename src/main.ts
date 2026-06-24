import './style.css'
import { injectLayout } from './components/layout'

injectLayout();
createParticleCanvas();

console.log('%c surya@devops:~$ System Online', 'color: #00d4ff; background: #050d1a; padding: 6px 12px; border-radius: 4px; font-weight: bold;');

function createParticleCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    pulse: number;
    pulseSpeed: number;
  }

  const COUNT = 55;
  const particles: Particle[] = [];

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.5 + 0.4,
      opacity: Math.random() * 0.45 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.018 + 0.008,
    });
  }

  function draw() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(0, 212, 255, ${0.07 * (1 - dist / 160)})`;
          ctx!.lineWidth = 0.6;
          ctx!.moveTo(particles[i].x, particles[i].y);
          ctx!.lineTo(particles[j].x, particles[j].y);
          ctx!.stroke();
        }
      }
    }

    for (const p of particles) {
      p.pulse += p.pulseSpeed;
      const op = p.opacity * (0.65 + 0.35 * Math.sin(p.pulse));

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(0, 212, 255, ${op})`;
      ctx!.fill();

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(0, 212, 255, ${op * 0.07})`;
      ctx!.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    }

    requestAnimationFrame(draw);
  }

  draw();
}
