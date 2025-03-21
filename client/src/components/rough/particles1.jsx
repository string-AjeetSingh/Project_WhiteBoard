import { useEffect, useRef } from "react";

const ParticleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];

        class Particle {
            constructor(x, y, size, speed, opacity) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speed = speed;
                this.opacity = opacity;
            }

            update() {
                this.y -= this.speed; // Move up
                this.opacity -= 0.005; // Fade out slower for brightness
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = "#ffffff"; // Brighter white
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function createParticles() {
            for (let i = 0; i < 5; i++) { // Continuously generate new particles
                let x = Math.random() * canvas.width;
                let y = canvas.height;
                let size = Math.random() * 5 + 3;
                let speed = Math.random() * 2 + 1;
                let opacity = 1;
                particles.push(new Particle(x, y, size, speed, opacity));
            }
        }

        function animate() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Dark background with slight trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

                if (particle.opacity <= 0) {
                    particles.splice(index, 1);
                }
            });
            createParticles(); // Keep particles continuously appearing
            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, background: "black" }} />;
};

export default ParticleCanvas;

