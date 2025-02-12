'use client';
"use strict";
exports.__esModule = true;
require("./globals.css");
var google_1 = require("next/font/google");
var navbar_1 = require("@/components/navbar");
var react_query_1 = require("@tanstack/react-query");
var wagmi_1 = require("wagmi");
var react_1 = require("@reown/appkit/react");
var appkit_adapter_wagmi_1 = require("@reown/appkit-adapter-wagmi");
var networks_1 = require("@reown/appkit/networks");
var react_2 = require("react");
var inter = google_1.Inter({ subsets: ['latin'] });
// Настраиваем QueryClient с оптимизированными параметрами для Web3 приложения
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false
        }
    }
});
var projectId = '2bb3b16994fef5232896dac751558dc2';
// Определяем сети в соответствии с требуемым типом [AppKitNetwork, ...AppKitNetwork[]]
var networks = [networks_1.mainnet, networks_1.arbitrum];
// Создаем адаптер с правильно типизированными сетями
var wagmiAdapter = new appkit_adapter_wagmi_1.WagmiAdapter({
    networks: networks,
    projectId: projectId,
    ssr: true
});
// Создаем конфигурацию AppKit с полным набором опций
react_1.createAppKit({
    adapters: [wagmiAdapter],
    networks: networks,
    projectId: projectId,
    features: {
        analytics: true
    },
    // Добавляем дополнительные опции из AppKitOptions
    themeMode: 'dark',
    themeVariables: {
        '--w3m-color-mix': '#4F46E5',
        '--w3m-accent': '#4F46E5',
        '--w3m-border-radius-master': '4px'
    },
    allowUnsupportedChain: false,
    defaultNetwork: networks_1.mainnet,
    showWallets: true
});
// Компонент анимированного фона
function QuantumBackground() {
    // Используем refs для хранения ссылок на canvas и частицы
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
        // Реализация частицы с типизацией
        var ParticleImpl = /** @class */ (function () {
            function ParticleImpl() {
                this.connections = [];
                // Perform null checks *inside* the constructor.
                if (canvas) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }
                else {
                    // Provide fallback values if canvas is null (very unlikely, but satisfies TypeScript)
                    this.x = 0;
                    this.y = 0;
                }
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = "hsl(220, " + (Math.random() * 50 + 50) + "%, " + (Math.random() * 30 + 50) + "%)";
            }
            ParticleImpl.prototype.update = function () {
                var _this = this;
                var _a, _b;
                this.x += this.speedX;
                this.y += this.speedY;
                // Check canvas here!  Use canvasRef.current since we are inside a method.
                if (canvasRef.current) {
                    if (this.x < 0 || this.x > canvasRef.current.width) {
                        this.speedX *= -1;
                    }
                    if (this.y < 0 || this.y > canvasRef.current.height) {
                        this.speedY *= -1;
                    }
                }
                this.connections = (_b = (_a = particlesRef.current) === null || _a === void 0 ? void 0 : _a.filter(function (p) { return Math.hypot(_this.x - p.x, _this.y - p.y) < 100 && p !== _this; })) !== null && _b !== void 0 ? _b : [];
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
        // Инициализация системы частиц
        function init() {
            particlesRef.current = Array.from({ length: 150 }, function () { return new ParticleImpl(); });
        }
        // Функция анимации
        function animate() {
            var _a;
            if (!canvas || !ctx)
                return;
            ctx.fillStyle = 'rgba(10, 11, 30, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            (_a = particlesRef.current) === null || _a === void 0 ? void 0 : _a.forEach(function (particle) {
                particle.update();
                particle.draw();
            });
        }
        // Обработчик изменения размера окна
        var handleResize = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        // Обработчик движения мыши
        var handleMouseMove = function (event) {
            var _a;
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
                (_a = particlesRef.current) === null || _a === void 0 ? void 0 : _a.push(particle);
            }
        };
        // Запускаем анимацию
        init();
        animate();
        // Добавляем обработчики событий
        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        // Очистка при размонтировании компонента
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
// Корневой компонент приложения
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: inter.className },
            React.createElement(wagmi_1.WagmiProvider, { config: wagmiAdapter.wagmiConfig },
                React.createElement(react_query_1.QueryClientProvider, { client: queryClient },
                    React.createElement("div", { className: "min-h-screen relative overflow-hidden bg-[#0A0B1E] text-white font-mono" },
                        React.createElement(QuantumBackground, null),
                        React.createElement("div", { className: "relative z-10" },
                            React.createElement(navbar_1.Navbar, null),
                            React.createElement("main", null, children))))))));
}
exports["default"] = RootLayout;
