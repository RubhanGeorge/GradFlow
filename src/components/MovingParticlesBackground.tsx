import React, { useEffect, useRef } from 'react';

interface MovingParticlesProps {
  particleCount?: number;
  speedMultiplier?: number;
  connectDistance?: number;
  className?: string;
  variant?: 'hero' | 'card' | 'compact';
}

export const MovingParticlesBackground: React.FC<MovingParticlesProps> = ({
  particleCount,
  speedMultiplier = 1,
  connectDistance,
  className = '',
  variant = 'hero'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const parent = canvas.parentElement;
    let width = (canvas.width = parent?.offsetWidth || window.innerWidth);
    let height = (canvas.height = parent?.offsetHeight || 400);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Default counts chosen to ensure high visibility and dense noticeable motion
    const targetCount = particleCount ?? (
      variant === 'hero' ? 110 :
      variant === 'card' ? 65 : 40
    );

    const threshold = connectDistance ?? (
      variant === 'hero' ? 100 : 85
    );

    const colors = [
      'rgba(255, 87, 34, ',   // Electric Vibrant Orange
      'rgba(255, 112, 67, ',  // Bright Coral
      'rgba(255, 171, 64, ',  // Rich Warm Amber
      'rgba(255, 215, 64, ',  // Solar Gold
      'rgba(255, 255, 255, '  // Bright Star White
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      baseAlpha: number;
      pulseSpeed: number;
      pulsePhase: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < targetCount; i++) {
      const radius = Math.random() * 1.6 + 1.0; // Simple, clean crisp dot size
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7 * speedMultiplier,
        vy: ((Math.random() - 0.5) * 0.7 - 0.2) * speedMultiplier, // Gentle floating upward motion
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.4 + 0.45, // Clean, crisp visibility
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Connective subtle constellation threads between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < threshold) {
            const lineAlpha = (1 - dist / threshold) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 87, 34, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Simple, crisp moving particle dots without thick glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulsePhase += p.pulseSpeed;

        // Wrap around boundaries seamlessly
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        if (p.y > height + 15) p.y = -15;

        const currentAlpha = Math.max(0.25, Math.min(0.9, p.baseAlpha + Math.sin(p.pulsePhase) * 0.18));

        // Clean, simple particle dot (no blur, no shadow, no thick aura)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha.toFixed(3)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, speedMultiplier, connectDistance, variant]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};
