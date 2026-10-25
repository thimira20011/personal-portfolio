import { useEffect, useRef } from 'react';

export default function AmbientBackground({ isDarkMode }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return undefined;
    let width;
    let height;
    let particles = [];
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.min(65, Math.floor(width * height / 18000)) }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        radius: Math.random() * 1.1 + .4,
      }));
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = isDarkMode ? 'rgba(147,197,253,.42)' : 'rgba(14,116,184,.24)';
        context.fill();
      });
    };
    // Draw the texture once; CSS moves its composited layer without repainting the canvas.
    const onResize = () => { resize(); draw(); };
    resize();
    draw();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [isDarkMode]);
  return <canvas ref={canvasRef} className="ambient-background" aria-hidden="true" />;
}
