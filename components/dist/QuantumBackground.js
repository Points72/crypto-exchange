'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function QuantumBackground() {
    var canvasRef = react_1.useRef(null);
    var particlesRef = react_1.useRef([]);
    var animationFrameRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var createParticle = function (x, y) { return ({
            x: x !== null && x !== void 0 ? x : Math.random() * canvas.width,
            y: y !== null && y !== void 0 ? y : Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 - 1.5,
            color: "hsl(220, " + (Math.random() * 50 + 50) + "%, " + (Math.random() * 30 + 50) + "%)"
        }); };
        var init = function () {
            particlesRef.current = Array.from({ length: 150 }, function () { return createParticle(); });
        };
        var updateParticle = function (particle) {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > canvas.width)
                particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height)
                particle.speedY *= -1;
        };
        var drawConnections = function (particle) {
            particlesRef.current.forEach(function (other) {
                if (other === particle)
                    return;
                var distance = Math.hypot(particle.x - other.x, particle.y - other.y);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = particle.color;
                    ctx.lineWidth = 0.2;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });
        };
        var drawParticle = function (particle) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        };
        var animate = function () {
            if (!canvas || !ctx)
                return;
            ctx.fillStyle = 'rgba(10, 11, 30, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach(function (particle) {
                updateParticle(particle);
                drawParticle(particle);
                drawConnections(particle);
            });
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        init();
        animate();
        var handleResize = function () {
            if (!canvas)
                return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        var handleMouseMove = function (e) {
            var _a;
            if (!canvas)
                return;
            var rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            if (particlesRef.current.length < 225) {
                (_a = particlesRef.current).push.apply(_a, Array.from({ length: 3 }, function () {
                    return createParticle(x, y);
                }));
            }
        };
        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        return function () {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);
    return React.createElement("canvas", { ref: canvasRef, className: "fixed inset-0 z-0" });
}
exports["default"] = QuantumBackground;
