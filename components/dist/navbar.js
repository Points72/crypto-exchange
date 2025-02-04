"use client";
"use strict";
exports.__esModule = true;
exports.Navbar = void 0;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var wallet_connect_1 = require("./wallet-connect");
var framer_motion_1 = require("framer-motion");
var navbar_module_css_1 = require("@/styles/navbar.module.css"); // ✅ Импорт стилей
var navItems = [
    { id: "swap", icon: lucide_react_1.ArrowLeftRight, label: "Swap", href: "/" },
    { id: "trade", icon: lucide_react_1.BarChart2, label: "Trade", href: "/trade" },
    { id: "pool", icon: lucide_react_1.Droplet, label: "Pool", href: "/pool" },
    { id: "arbitrage", icon: lucide_react_1.RefreshCw, label: "Arbitrage", href: "/arbitrage" },
    { id: "bridge", icon: lucide_react_1.BracketsIcon, label: "Bridge", href: "/bridge" },
    { id: "transfer", icon: lucide_react_1.Send, label: "Transfer", href: "/transfer" },
    { id: "cards", icon: lucide_react_1.CreditCard, label: "Cards", href: "/cards" },
    { id: "buy", icon: lucide_react_1.DollarSign, label: "Buy", href: "/buy" },
];
exports.Navbar = function () {
    var pathname = navigation_1.usePathname();
    return (React.createElement("div", { className: navbar_module_css_1["default"].navbar },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "flex items-center justify-between h-16 sm:h-20" },
                React.createElement("div", { className: "flex items-center space-x-3" },
                    React.createElement("div", { className: "relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center group" },
                        React.createElement("svg", { viewBox: "0 0 300 300", className: "w-full h-full transform transition-transform duration-300 hover:scale-105" },
                            React.createElement("defs", null,
                                React.createElement("radialGradient", { id: "backgroundGlow", cx: "50%", cy: "50%", r: "50%" },
                                    React.createElement("stop", { offset: "0%", stopColor: "#0A0B2E", stopOpacity: "1" }),
                                    React.createElement("stop", { offset: "100%", stopColor: "#020214", stopOpacity: "1" })),
                                React.createElement("radialGradient", { id: "centerGlow", cx: "50%", cy: "50%", r: "50%" },
                                    React.createElement("stop", { offset: "0%", stopColor: "#4A90E2", stopOpacity: "0.3" }),
                                    React.createElement("stop", { offset: "100%", stopColor: "#4A90E2", stopOpacity: "0" })),
                                React.createElement("filter", { id: "orbitsGlow", x: "-50%", y: "-50%", width: "200%", height: "200%" },
                                    React.createElement("feGaussianBlur", { "in": "SourceGraphic", stdDeviation: "0.5", result: "blur" }),
                                    React.createElement("feComposite", { "in": "SourceGraphic", in2: "blur", operator: "over" })),
                                React.createElement("filter", { id: "particleGlow" },
                                    React.createElement("feGaussianBlur", { stdDeviation: "1" }),
                                    React.createElement("feComposite", { "in": "SourceGraphic" }))),
                            React.createElement("circle", { cx: "150", cy: "150", r: "145", fill: "url(#backgroundGlow)" }),
                            React.createElement("circle", { cx: "150", cy: "150", r: "142", stroke: "#4A90E2", strokeWidth: "0.5", fill: "none", opacity: "0.2" }),
                            React.createElement("g", { transform: "translate(150,150)" },
                                React.createElement("circle", { r: "30", fill: "url(#centerGlow)", opacity: "0.5" }),
                                React.createElement("g", { fill: "none", stroke: "#FFFFFF", strokeWidth: "1.5" },
                                    React.createElement("circle", { r: "22" }),
                                    React.createElement("path", { d: "M0,-22 L19,11 L-19,11 Z" }),
                                    React.createElement("path", { d: "M-15,-15 L15,15 M-15,15 L15,-15" }))))),
                    React.createElement("span", { className: "text-xl font-bold text-white drop-shadow-lg hidden sm:inline-block" }, "QuantumDEX")),
                React.createElement("nav", { className: "flex space-x-1 sm:space-x-2" }, navItems.map(function (item) {
                    var Icon = item.icon;
                    var isActive = pathname === item.href;
                    return (React.createElement(link_1["default"], { key: item.id, href: item.href, className: "group px-2 py-2 sm:px-3 sm:py-2 rounded-md transition-all duration-300 relative " + (isActive ? "bg-[#4A90E2]/30 text-white" : "text-gray-300 hover:bg-[#4A90E2]/20 hover:text-white") },
                        React.createElement("div", { className: "flex flex-col items-center" },
                            React.createElement(Icon, { className: "w-5 h-5 transition-transform duration-300 " + (isActive ? "text-white scale-110" : "text-gray-300 group-hover:scale-110") }),
                            React.createElement("span", { className: "text-xs mt-1 hidden sm:inline-block" }, item.label)),
                        isActive && (React.createElement(framer_motion_1.motion.div, { className: "absolute inset-0 bg-[#7A88FF]/20 rounded-md z-0", layoutId: "activeNavItem", initial: false, transition: {
                                type: "spring",
                                stiffness: 500,
                                damping: 30
                            } }))));
                })),
                React.createElement(wallet_connect_1.WalletConnect, null)))));
};
