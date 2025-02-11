"use client";
"use strict";
exports.__esModule = true;
require("./globals.css");
var google_1 = require("next/font/google");
var navbar_1 = require("@/components/navbar");
var react_1 = require("@reown/appkit/react");
var react_query_1 = require("@tanstack/react-query");
var appkit_adapter_wagmi_1 = require("@reown/appkit-adapter-wagmi");
var react_2 = require("react");
var inter = google_1.Inter({ subsets: ["latin"] });
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false
        }
    }
});
var projectId = '2bb3b16994fef5232896dac751558dc2';
var metadata = {
    name: 'Quantum Exchange',
    description: 'Quantum Exchange Platform',
    url: 'https://quantum-exchange.com',
    uri: 'https://quantum-exchange.com',
    icons: ['https://quantum-exchange.com/icon.png']
};
// Правильно типизируем сети для AppKit
var networks = [mainnet, arbitrum];
var wagmiAdapter = new appkit_adapter_wagmi_1.WagmiAdapter({
    networks: networks,
    projectId: projectId,
    ssr: true
});
react_1.createAppKit({
    adapters: [wagmiAdapter],
    networks: networks,
    projectId: projectId,
    metadata: metadata,
    features: {
        analytics: true
    }
});
function QuantumBackground() {
    var canvasRef = react_2.useRef(null);
    react_2.useEffect(function () {
        var canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas element is null");
            return;
        }
        var ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Canvas context is null");
            return;
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var particles = [];
        var particleCount = 150;
        var ParticleImpl = /** @class */ (function () {
            function ParticleImpl() {
                this.x = 0;
                this.y = 0;
                this.size = 1;
                this.speedX = 0;
                this.speedY = 0;
                this.color = "";
                this.connections = [];
                if (!canvas)
                    return;
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = "hsl(220, " + (Math.random() * 50 + 50) + "%, " + (Math.random() * 30 + 50) + "%)";
            }
            ParticleImpl.prototype.update = function () {
                var _this = this;
                if (!canvas)
                    return;
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width)
                    this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height)
                    this.speedY *= -1;
                this.connections = particles.filter(function (p) { return (Math.hypot(_this.x - p.x, _this.y - p.y) < 100 && p !== _this); });
            };
            ParticleImpl.prototype.draw = function () {
                var _this = this;
                if (!ctx)
                    return;
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
            return ParticleImpl;
        }());
        function init() {
            for (var i = 0; i < particleCount; i++) {
                particles.push(new ParticleImpl());
            }
        }
        function animate() {
            if (!canvas || !ctx)
                return;
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
            if (!canvas)
                return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        var handleMouseMove = function (event) {
            if (!canvas)
                return;
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            for (var i = 0; i < 3; i++) {
                var particle = new ParticleImpl();
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
            React.createElement(WagmiProvider, { config: wagmiAdapter.wagmiConfig },
                React.createElement(react_query_1.QueryClientProvider, { client: queryClient },
                    React.createElement("div", { className: "min-h-screen relative overflow-hidden bg-[#0A0B1E] text-white font-mono" },
                        React.createElement(QuantumBackground, null),
                        React.createElement("div", { className: "relative z-10" },
                            React.createElement(navbar_1.Navbar, null),
                            React.createElement("main", null, children))))))));
}
exports["default"] = RootLayout;
