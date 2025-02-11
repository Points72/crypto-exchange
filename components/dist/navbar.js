"use client";
"use strict";
exports.__esModule = true;
exports.Navbar = void 0;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var wallet_connect_1 = require("./wallet-connect");
var framer_motion_1 = require("framer-motion");
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
    return (React.createElement("div", { className: "border-b border-gray-800 bg-[#0A0B2E]/50 backdrop-blur-xl" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "flex items-center justify-between h-16 sm:h-20" },
                React.createElement("div", { className: "flex items-center space-x-3" },
                    React.createElement("div", { className: "w-8 h-8 sm:w-10 sm:h-10" },
                        React.createElement("svg", { viewBox: "0 0 300 300", className: "w-full h-full" },
                            React.createElement("defs", null,
                                React.createElement("radialGradient", { id: "backgroundGlow", cx: "50%", cy: "50%", r: "50%" },
                                    React.createElement("stop", { offset: "0%", className: "text-[#0A0B2E] opacity-100" }),
                                    React.createElement("stop", { offset: "100%", className: "text-[#020214] opacity-100" })),
                                React.createElement("radialGradient", { id: "centerGlow", cx: "50%", cy: "50%", r: "50%" },
                                    React.createElement("stop", { offset: "0%", className: "text-[#4A90E2] opacity-30" }),
                                    React.createElement("stop", { offset: "100%", className: "text-[#4A90E2] opacity-0" })),
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
                                    React.createElement("path", { d: "M-15,-15 L15,15 M-15,15 L15,-15" }))),
                            React.createElement("g", { transform: "translate(150,150)", filter: "url(#orbitsGlow)" },
                                React.createElement("g", { stroke: "#4A90E2", fill: "none", opacity: "0.8", strokeWidth: "1" },
                                    React.createElement("ellipse", { rx: "75", ry: "75" }),
                                    React.createElement("ellipse", { rx: "75", ry: "75", transform: "rotate(60)" }),
                                    React.createElement("ellipse", { rx: "75", ry: "75", transform: "rotate(120)" })),
                                React.createElement("g", { filter: "url(#particleGlow)" },
                                    React.createElement("g", { fill: "#FFFFFF" },
                                        React.createElement("circle", { cx: "75", cy: "0", r: "2.5" }),
                                        React.createElement("circle", { cx: "-75", cy: "0", r: "2.5" }),
                                        React.createElement("circle", { cx: "37.5", cy: "64.95", r: "2.5" }),
                                        React.createElement("circle", { cx: "-37.5", cy: "-64.95", r: "2.5" }),
                                        React.createElement("circle", { cx: "-37.5", cy: "64.95", r: "2.5" }),
                                        React.createElement("circle", { cx: "37.5", cy: "-64.95", r: "2.5" })),
                                    React.createElement("g", { fill: "#FFFFFF", opacity: "0.6" },
                                        React.createElement("circle", { cx: "0", cy: "75", r: "1" }),
                                        React.createElement("circle", { cx: "0", cy: "-75", r: "1" }),
                                        React.createElement("circle", { cx: "65", cy: "37.5", r: "1" }),
                                        React.createElement("circle", { cx: "-65", cy: "-37.5", r: "1" }),
                                        React.createElement("circle", { cx: "-65", cy: "37.5", r: "1" }),
                                        React.createElement("circle", { cx: "65", cy: "-37.5", r: "1" })))))),
                    React.createElement("span", { className: "text-lg sm:text-xl font-semibold text-white" }, "QuantumDEX")),
                React.createElement("nav", { className: "flex space-x-1 sm:space-x-2" }, navItems.map(function (item) {
                    var Icon = item.icon;
                    var isActive = pathname === item.href;
                    return (React.createElement(link_1["default"], { key: item.id, href: item.href, className: "relative px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-colors" },
                        React.createElement("div", { className: "flex flex-col items-center" },
                            React.createElement(Icon, { className: "w-5 h-5 sm:w-6 sm:h-6 mb-1 " + (isActive ? 'text-blue-400' : 'text-gray-400') }),
                            React.createElement("span", { className: "text-xs sm:text-sm font-medium " + (isActive ? 'text-white' : 'text-gray-400') }, item.label)),
                        isActive && (React.createElement(framer_motion_1.motion.div, { className: "absolute inset-0 bg-gray-800/50 rounded-lg -z-10", layoutId: "activeNavItem", initial: false, transition: {
                                type: "spring",
                                stiffness: 500,
                                damping: 30
                            } }))));
                })),
                React.createElement(wallet_connect_1.WalletConnect, null)))));
};
