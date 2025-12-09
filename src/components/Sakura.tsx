import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

type Petal = {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  swayPhase: number;
  swaySpeed: number;
  alpha: number;
};

export default function Sakura() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const { isDark } = useTheme();

  useEffect(() => {
    if (isDark) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let w = window.innerWidth;
    let h = window.innerHeight;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPetals();
    }

    function initPetals() {
      const area = w * h;
      const count = Math.max(30, Math.min(100, Math.floor(area / 15000)));
      const petals: Petal[] = [];
      
      for (let i = 0; i < count; i++) {
        petals.push({
          x: Math.random() * w,
          y: Math.random() * h - h,
          size: 8 + Math.random() * 12,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          vx: (Math.random() - 0.5) * 0.5,
          vy: 0.3 + Math.random() * 0.8,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.01 + Math.random() * 0.02,
          alpha: 0.6 + Math.random() * 0.4,
        });
      }
      
      petalsRef.current = petals;
    }

    function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;

      const size = p.size;
      
      // Sakura leaf shape (teardrop/oval)
      const gradient = ctx.createLinearGradient(-size * 0.3, -size * 0.5, size * 0.3, size * 0.5);
      gradient.addColorStop(0, '#ffb7d5');
      gradient.addColorStop(0.5, '#ffc6e0');
      gradient.addColorStop(1, '#ffe0f0');
      
      ctx.fillStyle = gradient;
      
      // Draw leaf shape using bezier curves
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.6); // top point
      
      // Right side curve
      ctx.bezierCurveTo(
        size * 0.5, -size * 0.3,  // control point 1
        size * 0.5, size * 0.3,   // control point 2
        0, size * 0.6             // bottom point
      );
      
      // Left side curve
      ctx.bezierCurveTo(
        -size * 0.5, size * 0.3,  // control point 1
        -size * 0.5, -size * 0.3, // control point 2
        0, -size * 0.6            // back to top
      );
      
      ctx.fill();
      
      // Add center vein for detail
      ctx.strokeStyle = 'rgba(255, 182, 213, 0.4)';
      ctx.lineWidth = size * 0.08;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.5);
      ctx.lineTo(0, size * 0.5);
      ctx.stroke();
      
      ctx.restore();
    }

    let last = performance.now();
    function loop(now: number) {
      const dt = Math.min(40, now - last) / 16.6667;
      last = now;

      ctx.clearRect(0, 0, w, h);

      for (const p of petalsRef.current) {
        p.swayPhase += p.swaySpeed * dt;
        p.rotation += p.rotationSpeed * dt;
        
        const sway = Math.sin(p.swayPhase) * 0.8;
        p.x += (p.vx + sway) * dt;
        p.y += p.vy * dt;

        if (p.y - p.size > h + 20) {
          p.x = Math.random() * w;
          p.y = -20 - Math.random() * 100;
          p.rotation = Math.random() * Math.PI * 2;
          p.swayPhase = Math.random() * Math.PI * 2;
        }
        
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;

        drawPetal(ctx, p);
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

  return <canvas ref={canvasRef} className="sakura-canvas" aria-hidden />;
}