import { useEffect, useRef } from 'react';
import '../Styling/particle.css';


// ✅ Move class OUTSIDE component
class Particle {
  constructor(width, height, ctx, color) {
    this.ctx = ctx;
    this.color = color;

    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.radius = 1.6;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${this.color},0.35)`;
    this.ctx.fill();
  }

  update(width, height) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    this.draw();
  }
}



const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: null, y: null };

    // ✅ Save handlers for cleanup
    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const COLOR = '1, 4, 71';
    const PARTICLE_COUNT = 90;
    const MAX_DISTANCE = 120;

    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle(width, height, ctx, COLOR));
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MAX_DISTANCE) {
            const opacity = 1 - distance / MAX_DISTANCE;
            ctx.strokeStyle = `rgba(${COLOR}, ${opacity * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => p.update(width, height));
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // ✅ Proper Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <div className="particles-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Particles;
