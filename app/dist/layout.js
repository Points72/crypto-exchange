"use client";
"use strict";
exports.__esModule = true;
require("../globals.css"); // Убедись, что этот путь корректен
var google_1 = require("next/font/google");
var navbar_1 = require("@/components/navbar");
var wallet_connect_1 = require("@/components/wallet-connect");
var react_1 = require("react");
var inter = google_1.Inter({ subsets: ["latin"] });
function QuantumBackground() {
    var canvasRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var particles = [];
        var particleCount = 150;
        var Particle = /** @class */ (function () {
            function Particle() {
                this.x = 0;
                this.y = 0;
                this.size = 1;
                this.speedX = 0;
                this.speedY = 0;
                this.color = "";
                this.connections = [];
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = "hsl(220, " + (Math.random() * 50 + 50) + "%, " + (Math.random() * 30 + 50) + "%)";
            }
            Particle.prototype.update = function () {
                var _this = this;
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width)
                    this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height)
                    this.speedY *= -1;
                this.connections = particles.filter(function (p) { return Math.hypot(_this.x - p.x, _this.y - p.y) < 100 && p !== _this; });
            };
            Particle.prototype.draw = function () {
                var _this = this;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                this.connections.forEach(function (p) {
                    ctx.strokeStyle = _this.color;
                    ctx.lineWidth = 0.1;
                    ctx.beginPath();
                    ctx.moveTo(_this.x, _this.y);
                    ctx.lineTo(p.x, p.y);
                    ctx.stroke();
                });
            };
            return Particle;
        }());
        function init() {
            for (var i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        function animate() {
            ctx.fillStyle = "rgba(10, 11, 30, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animate);
        }
        init();
        animate();
        var handleResize = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        var handleMouseMove = function (event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            for (var i = 0; i < 3; i++) {
                var particle = new Particle();
                particle.x = x;
                particle.y = y;
                particle.size = Math.random() * 5 + 2;
                particle.speedX = Math.random() * 5 - 2.5;
                particle.speedY = Math.random() * 5 - 2.5;
                particle.color = "hsl(220, " + (Math.random() * 50 + 50) + "%, " + (Math.random() * 30 + 70) + "%)";
                particles.push(particle);
            }
        };
        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);
        return function () {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    return React.createElement("canvas", { ref: canvasRef, className: "fixed inset-0 z-0" });
}
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: inter.className },
            React.createElement(wallet_connect_1.WalletConnectProvider, null,
                React.createElement("div", { className: "min-h-screen relative overflow-hidden bg-[#0A0B1E] text-white font-mono" },
                    React.createElement(QuantumBackground, null),
                    React.createElement("div", { className: "relative z-10" },
                        React.createElement(navbar_1.Navbar, null),
                        React.createElement("main", null, children)))))));
}
exports["default"] = RootLayout;
