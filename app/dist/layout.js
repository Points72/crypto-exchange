'use client';
"use strict";
exports.__esModule = true;
require("./globals.css");
var google_1 = require("next/font/google");
var navbar_1 = require("@/components/navbar");
var react_query_1 = require("@tanstack/react-query");
var wagmi_1 = require("wagmi");
var public_1 = require("wagmi/providers/public");
var wagmi_2 = require("wagmi");
var react_1 = require("@web3modal/wagmi/react");
var wagmi_3 = require("@web3modal/wagmi");
var ethereum_1 = require("@web3modal/ethereum");
var react_2 = require("react");
var inter = google_1.Inter({ subsets: ['latin'] });
// 1. Configure chains and providers
var projectId = '2bb3b16994fef5232896dac751558dc2'; // Replace with your Project ID
var _a = wagmi_1.configureChains([wagmi_1.mainnet, wagmi_1.arbitrum], [wagmi_3.walletConnectProvider({ projectId: projectId }), public_1.publicProvider()]), chains = _a.chains, publicClient = _a.publicClient;
// 2. Create wagmiConfig
var wagmiConfig = wagmi_1.createConfig({
    autoConnect: true,
    connectors: [],
    publicClient: publicClient
});
// 3. Create ethereum client
var ethereumClient = new ethereum_1.EthereumClient(wagmiConfig, chains);
// 4. Create Web3Modal
react_1.createWeb3Modal({
    wagmiConfig: wagmiConfig,
    projectId: projectId,
    chains: chains,
    themeVariables: {
        '--w3m-accent': '#4F46E5'
    }
});
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false
        }
    }
});
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
            particlesRef.current = [];
            for (var i = 0; i < 150; i++) {
                particlesRef.current.push(new Particle());
            }
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
            if (!canvas)
                return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particlesRef.current = [];
            init();
        };
        var handleMouseMove = function (event) {
            if (!canvas)
                return;
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
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);
    return React.createElement("canvas", { ref: canvasRef, className: "fixed inset-0 z-0" });
}
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: inter.className },
            React.createElement(wagmi_2.WagmiConfig, { config: wagmiConfig },
                React.createElement(react_query_1.QueryClientProvider, { client: queryClient },
                    React.createElement("div", { className: "min-h-screen relative overflow-hidden bg-[#0A0B1E] text-white font-mono" },
                        React.createElement(QuantumBackground, null),
                        React.createElement("div", { className: "relative z-10" },
                            React.createElement(navbar_1.Navbar, null),
                            React.createElement("main", null, children))))))));
}
exports["default"] = RootLayout;
