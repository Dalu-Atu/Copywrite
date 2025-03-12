// pages/404.js
"use client";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.floor(canvas.width * 0.1);

    class Particle {
      constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (
          this.x + this.radius < 0 ||
          this.x - this.radius > canvas.width ||
          this.y + this.radius < 0 ||
          this.y - this.radius > canvas.height
        ) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 3 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
      const velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      };
      particles.push(new Particle(x, y, radius, color, velocity));
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
      });
    }

    animate();

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-[#11475b] to-black">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-6xl font-extrabold mb-4 animate-pulse">404</h1>
          <p className="text-xl mb-8 px-3">
            Oops! The page you're looking for could not be found.
          </p>
          <Link
            href="/"
            className="bg-[#015979] hover:bg-[#136b8b] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
          >
            Go back home
          </Link>
          <div className="mt-10">
            <p className="text-sm text-gray-400">Try checking the URL .</p>
          </div>
        </div>
      </div>
    </>
  );
}
