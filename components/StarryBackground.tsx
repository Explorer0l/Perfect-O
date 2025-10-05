'use client';

import { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number; // Для параллакс эффекта (1 = близко, 3 = далеко)
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for interactivity
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll tracking for parallax
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Create stars with layers for parallax
    const createStars = () => {
      const stars: Star[] = [];
      const starCount = 400; // Больше звезд для лучшего эффекта

      for (let i = 0; i < starCount; i++) {
        const layer = Math.ceil(Math.random() * 3); // 3 слоя
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 3, // Больше пространства для скролла
          radius: Math.random() * (layer === 1 ? 2 : 1.5) + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          speed: Math.random() * 0.05 + 0.01 * layer,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          layer,
        });
      }
      starsRef.current = stars;
    };

    createStars();

    // Create shooting stars randomly
    const createShootingStar = () => {
      if (Math.random() > 0.98 && shootingStarsRef.current.length < 3) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.3, // Верхняя часть экрана
          length: Math.random() * 80 + 40,
          speed: Math.random() * 5 + 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.5, // ~45 градусов
          opacity: 1,
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula-like gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
      gradient.addColorStop(1, 'rgba(10, 10, 30, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Parallax effect based on scroll
      const parallaxOffset = scrollRef.current * 0.3;

      // Draw and update stars with parallax and mouse interaction
      starsRef.current.forEach((star) => {
        // Parallax Y position (разные слои двигаются с разной скоростью)
        const parallaxY = star.y - parallaxOffset * (1 / star.layer);
        
        // Mouse interaction (звезды немного отклоняются от курсора)
        const dx = mouseRef.current.x - star.x;
        const dy = mouseRef.current.y - parallaxY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        let offsetX = 0;
        let offsetY = 0;
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          offsetX = -(dx / distance) * force * 10;
          offsetY = -(dy / distance) * force * 10;
        }

        // Twinkling effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;

        // Pulsing effect (при перелистывании страниц)
        const pulseMultiplier = isPulsing ? 1.5 : 1;

        // Draw star with effects
        const finalX = star.x + offsetX;
        const finalY = parallaxY + offsetY;

        // Skip if out of view
        if (finalY < -50 || finalY > canvas.height + 50) {
          return;
        }

        ctx.beginPath();
        ctx.arc(finalX, finalY, star.radius * pulseMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();

        // Add glow for larger stars and close layer
        if (star.radius > 1 || star.layer === 1) {
          ctx.shadowBlur = 10 * pulseMultiplier;
          ctx.shadowColor = star.layer === 1 
            ? 'rgba(139, 92, 246, 0.6)' 
            : 'rgba(255, 255, 255, 0.5)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Slow drift
        star.y += star.speed;
        if (star.y > canvas.height + parallaxOffset + 500) {
          star.y = -50;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw shooting stars
      createShootingStar();
      shootingStarsRef.current = shootingStarsRef.current.filter(shootingStar => {
        // Update position
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.008;

        if (shootingStar.opacity <= 0) return false;

        // Draw shooting star trail
        const gradient = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 192, 246, ${shootingStar.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        );
        ctx.stroke();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPulsing]);

  // Expose pulse trigger for page flips
  useEffect(() => {
    const handlePageFlip = () => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1200);
    };

    window.addEventListener('pageFlip', handlePageFlip);
    return () => window.removeEventListener('pageFlip', handlePageFlip);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)' }}
    />
  );
}
