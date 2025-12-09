import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

type Drop = { x: number; y: number; len: number; vy: number; vx: number; alpha: number };

export default function Rain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const dropsRef = useRef<Drop[]>([]);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!isDark) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDrops();
    }

    function initDrops() {
      const area = w * h;
      const count = Math.min(500, Math.max(80, Math.floor(area / 12000)));
      const drops: Drop[] = [];
      for (let i = 0; i < count; i++) {
        drops.push({
          x: Math.random() * w,
          y: Math.random() * h - h,
          len: 6 + Math.random() * 18,
          vy: (200 + Math.random() * 600) / 60,
          vx: (Math.random() - 0.5) * 0.6,
          alpha: 0.18 + Math.random() * 0.6,
        });
      }
      dropsRef.current = drops;
    }

    let last = performance.now();
    function loop(now: number) {
      const dt = Math.min(40, now - last) / 16.6667;
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      for (const d of dropsRef.current) {
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        if (d.y - d.len > h) {
          d.x = Math.random() * w;
          d.y = -10 - Math.random() * 200;
          d.len = 6 + Math.random() * 18;
          d.vy = (200 + Math.random() * 600) / 60;
          d.vx = (Math.random() - 0.5) * 0.6;
          d.alpha = 0.18 + Math.random() * 0.6;
        }
        const grad = ctx.createLinearGradient(d.x, d.y - d.len, d.x, d.y);
        grad.addColorStop(0, `rgba(200,230,255,${d.alpha * 0.0})`);
        grad.addColorStop(1, `rgba(171,194,233,${d.alpha})`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y - d.len);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="rain-canvas" aria-hidden />;
}