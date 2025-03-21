import { useEffect, useRef } from "react";


const ParticleCanvas = ({ width, height }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let particles = [];
        let animationFrameId;

        class Particle {
            constructor(x, y, size, speed, opacity) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speed = speed * 0.6;
                this.opacity = opacity;
                this.twinkleSpeed = Math.random() * 0.05 + 0.02;
            }

            update() {
                this.y -= this.speed;
                this.opacity -= 0.002;
                this.opacity += Math.sin(Date.now() * this.twinkleSpeed) * 0.05;
                if (this.opacity > 1) this.opacity = 1;
                if (this.opacity < 0) this.opacity = 0;
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = localStorage.getItem('screenMode') === 'dark' ? "#c3daf1" : '#002f42';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function createParticles() {
            for (let i = 0; i < Math.max(2, Math.floor(width / 400)); i++) {
                let x = Math.random() * canvas.width;
                let y = canvas.height;
                let size = Math.random() * 2 + 1;
                let speed = Math.random() * 2 + 1;
                let opacity = 1;
                particles.push(new Particle(x, y, size, speed, opacity));
            }
        }

        function animate() {
            ctx.fillStyle = localStorage.getItem('screenMode') === 'dark' ? "rgb(10, 68, 95)" : '#3a7188';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                if (particle.opacity <= 0) {
                    particles.splice(index, 1);
                }
            });
            createParticles();
            animationFrameId = requestAnimationFrame(animate);
        }

        const resizeCanvas = () => {
            canvas.width = width;
            canvas.height = height;
        };

        resizeCanvas();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [width, height]);

    return <canvas onClick={() => {


    }} ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "var(--darkPanle)" }} />;
};

export default ParticleCanvas;
