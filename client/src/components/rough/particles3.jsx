import { useEffect, useRef } from "react";

const ParticleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        let shineX = -canvas.width; // Initial position of diagonal shine
        const shineSpeed = 2; // Speed of diagonal shine
        const shineWidth = canvas.width / 100; // Further reduced width of shine bar

        class Particle {
            constructor(x, y, size, speed, opacity) {
                this.x = x;
                this.y = y;
                this.size = size * 0.5; // Smaller particles
                this.speed = speed * 0.5; // Slightly slower movement
                this.opacity = opacity;
                this.twinkleSpeed = Math.random() * 0.05 + 0.02; // Twinkle effect variation
            }

            update() {
                this.y -= this.speed; // Move up
                this.opacity -= 0.005; // Fade out slower
                this.opacity += Math.sin(Date.now() * this.twinkleSpeed) * 0.05; // Twinkle effect
                if (this.opacity > 1) this.opacity = 1;
                if (this.opacity < 0) this.opacity = 0;
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
            for (let i = 0; i < 1; i++) { // Reduce particle quantity further
                let x = Math.random() * canvas.width;
                let y = canvas.height;
                let size = Math.random() * 1.5 + 0.5; // Smaller particles
                let speed = Math.random() * 1.5 + 0.5;
                let opacity = 1;
                particles.push(new Particle(x, y, size, speed, opacity));
            }
        }

        function drawShine() {
            const gradient = ctx.createLinearGradient(shineX, -shineWidth, shineX + canvas.width, canvas.height + shineWidth);
            gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
            gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            shineX += shineSpeed;
            if (shineX > canvas.width + shineWidth) {
                shineX = -shineWidth * 2; // Ensure it starts fully outside the screen again
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
            drawShine(); // Draw the diagonal shine effect
            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, background: "black" }} />;
};

export default ParticleCanvas;
