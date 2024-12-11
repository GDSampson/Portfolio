'use client';

import { useEffect, useRef } from 'react';

interface DotProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  inMouseRadius: boolean;
  move: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

class Dot implements DotProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  inMouseRadius: boolean;
  private readonly canvasWidth: number;
  private readonly canvasHeight: number;

  constructor(x: number, y: number, canvasWidth: number, canvasHeight: number) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 0.1 - 1 * 0.1;
    this.dy = Math.random() * 0.1 - 1 * 0.1;
    this.inMouseRadius = false;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  move(): void {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > this.canvasWidth) this.dx = -this.dx;
    if (this.y < 0 || this.y > this.canvasHeight) this.dy = -this.dy;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = '#68AF78';
    ctx.fill();
  }
}

export default function DotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CONSTANTS = {
      maxDots: 500,
      maxDist: 100,
      mouseRadius: 450,
    } as const;

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const setCanvasSize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const dots: Dot[] = [];

    const handleMouseMove = (e: MouseEvent): void => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const connectDots = (): void => {
      for (let i = 0; i < dots.length; i++) {
        const distToMouse = Math.hypot(dots[i].x - mouseX, dots[i].y - mouseY);

        if (distToMouse < CONSTANTS.mouseRadius) {
          dots[i].inMouseRadius = true;

          for (let j = 0; j < dots.length; j++) {
            if (i !== j && dots[j].inMouseRadius) {
              const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
              if (dist < CONSTANTS.maxDist) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = 'rgba(0, 188, 212, 0.5)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        } else {
          dots[i].inMouseRadius = false;
        }
      }
    };

    // Initialize dots
    for (let i = 0; i < CONSTANTS.maxDots; i++) {
      dots.push(new Dot(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        canvas.width,
        canvas.height
      ));
    }

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach(dot => {
        dot.move();
        dot.draw(ctx);
      });

      connectDots();
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setCanvasSize);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-10 bg-[#1a1a1a]"
      aria-hidden="true"
    />
  );
}