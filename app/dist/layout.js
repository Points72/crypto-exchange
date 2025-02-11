'use client';
"use strict";
exports.__esModule = true;
require("./globals.css");
var google_1 = require("next/font/google");
var navbar_1 = require("@/components/navbar");
var react_query_1 = require("@tanstack/react-query");
var wagmi_1 = require("wagmi");
var chains_1 = require("wagmi/chains");
var react_1 = require("@web3modal/wagmi/react");
var react_2 = require("react");
var inter = google_1.Inter({ subsets: ['latin'] });
// 1. Setup project ID and chains
var projectId = '2bb3b16994fef5232896dac751558dc2'; // Replace with your Project ID
var chains = [chains_1.mainnet, chains_1.arbitrum];
// 2. Create wagmiConfig
var metadata = {
    name: 'Quantum Exchange',
    description: 'Quantum Exchange Platform',
    url: 'crypto-exchange-git-main-melania.vercel.app',
    icons: ['https://github.com/Points72/crypto-exchange/blob/main/public/final-quantum-logo%20(1).svg']
};
var wagmiConfig = react_1.defaultWagmiConfig({
    chains: chains,
    projectId: projectId,
    metadata: metadata
});
// 3. Create Web3Modal
react_1.createWeb3Modal({
    wagmiConfig: wagmiConfig,
    projectId: projectId,
    chains: chains,
    themeVariables: {
        '--w3m-color-mix': '#4F46E5',
        '--w3m-accent': '#4F46E5',
        '--w3m-border-radius-master': '4px'
    }
});
var queryClient = new react_query_1.QueryClient();
function QuantumBackground() {
    var canvasRef = react_2.useRef(null);
    var animationFrameRef = react_2.useRef(null);
    var particlesRef = react_2.useRef([]);
    react_2.useEffect(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var Particle = /** @class */ (function () {
            function Particle() {
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
                this.connections = particlesRef.current.filter(function (p) { return Math.hypot(_this.x - p.x, _this.y - p.y) < 100 && p !== _this; });
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
        var init = function () {
            particlesRef.current = Array.from({ length: 150 }, function () { return new Particle(); });
        };
        var animate = function () {
            if (!canvas || !ctx)
                return;
            ctx.fillStyle = 'rgba(10, 11, 30, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach(function (particle) {
                particle.update();
                particle.draw();
            });
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        init();
        animate();
        var handleResize = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
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
                particlesRef.current.push(particle);
            }
        };
        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        return function () {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            animationFrameRef.current && cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);
    return React.createElement("canvas", { ref: canvasRef, className: "fixed inset-0 z-0" });
}
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: inter.className },
            React.createElement(wagmi_1.WagmiProvider, { config: wagmiConfig },
                React.createElement(react_query_1.QueryClientProvider, { client: queryClient },
                    React.createElement("div", { className: "min-h-screen relative overflow-hidden bg-[#0A0B1E] text-white font-mono" },
                        React.createElement(QuantumBackground, null),
                        React.createElement("div", { className: "relative z-10" },
                            React.createElement(navbar_1.Navbar, null),
                            React.createElement("main", null, children))))))));
}
exports["default"] = RootLayout;
