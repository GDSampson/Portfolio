'use client';

// build with the help of chatgpt

import React, { useEffect, useRef } from 'react';

interface DotProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  inMouseRadius: boolean;
}

class Dot implements DotProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  inMouseRadius: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 0.1 - 1 * 0.1;
    this.dy = Math.random() * 0.1 - 1 * 0.1;
    this.inMouseRadius = false;
  }

  move(canvasWidth: number, canvasHeight: number): void {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > canvasWidth) this.dx = -this.dx;
    if (this.y < 0 || this.y > canvasHeight) this.dy = -this.dy;
  }

  draw(ctx: CanvasRenderingContext2D, dotRadius: number): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#68AF78';
    ctx.fill();
  }
}

const DotsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Constants
    const CONSTANTS = {
      maxDots: 500,
      maxDist: 100,
      dotRadius: 1,
      mouseRadius: 450,
    } as const;

    // State
    let mouseX = 0;
    let mouseY = 0;
    const dots: Dot[] = [];

    // Set canvas size
    const setCanvasSize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const createDots = (): void => {
      for (let i = 0; i < CONSTANTS.maxDots; i++) {
        dots.push(new Dot(Math.random() * canvas.width, Math.random() * canvas.height));
      }
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

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach(dot => {
        dot.move(canvas.width, canvas.height);
        dot.draw(ctx, CONSTANTS.dotRadius);
      });

      connectDots();
      requestAnimationFrame(animate);
    };

    // Initialize
    createDots();
    animate();

    // Event listeners
    const handleMouseMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleResize = (): void => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-10 bg-[#1a1a1a]"
      aria-hidden="true"
    />
  );
};

export default DotsBackground;