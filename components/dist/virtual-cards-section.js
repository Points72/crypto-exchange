"use client";
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.VirtualCardsSection = void 0;
var react_1 = require("react");
exports.VirtualCardsSection = function () {
    // Используем типизированный state для карт
    var _a = react_1.useState([
        {
            id: 1,
            number: "4000 1234 5678 9010",
            expires: "12/25",
            balance: "$1,500",
            status: "Active",
            cvv: "123"
        },
        {
            id: 2,
            number: "4000 9876 5432 1010",
            expires: "08/26",
            balance: "$2,300",
            status: "Frozen",
            cvv: "456"
        },
    ]), cards = _a[0], setCards = _a[1];
    // Функция для генерации новой карты с случайными данными
    var generateNewCard = function () {
        var newCard = {
            id: cards.length + 1,
            number: "4000 " + Math.random().toString().slice(2, 6) + " " + Math.random()
                .toString()
                .slice(2, 6) + " " + Math.random().toString().slice(2, 6),
            expires: Math.floor(Math.random() * 12 + 1)
                .toString()
                .padStart(2, "0") + "/" + Math.floor(Math.random() * 5 + 24),
            balance: "$0",
            status: "Active",
            cvv: Math.floor(Math.random() * 900 + 100).toString()
        };
        setCards(__spreadArrays(cards, [newCard]));
    };
    return (React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" },
        React.createElement("div", { className: "lg:col-span-2" },
            React.createElement("div", { className: "bg-slate-800 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-between items-center mb-6" },
                    React.createElement("h2", { className: "text-lg font-medium" }, "Virtual Cards"),
                    React.createElement("button", { onClick: generateNewCard, className: "bg-violet-600 px-4 py-2 rounded-lg hover:bg-violet-500 transition-colors", "aria-label": "Generate new virtual card" }, "Generate New Card")),
                React.createElement("div", { className: "flex flex-wrap gap-4 overflow-auto max-h-[400px]", role: "list", "aria-label": "Virtual cards list" }, cards.map(function (card) { return (React.createElement("div", { key: card.id, className: "bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6 min-w-[280px]", role: "listitem" },
                    React.createElement("div", { className: "flex justify-between items-start mb-6" },
                        React.createElement("span", { className: "text-sm" }, "Virtual Card"),
                        React.createElement("span", { className: "text-sm px-2 py-1 rounded " + (card.status === "Active" ? "bg-green-500" : "bg-gray-500"), role: "status" }, card.status)),
                    React.createElement("p", { className: "text-2xl mb-4 font-mono", "aria-label": "Card number" }, card.number),
                    React.createElement("div", { className: "flex justify-between items-center" },
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-sm text-gray-300" }, "Expires"),
                            React.createElement("p", { "aria-label": "Expiration date" }, card.expires)),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-sm text-gray-300" }, "CVV"),
                            React.createElement("p", { "aria-label": "Card CVV" }, card.cvv)),
                        React.createElement("div", { className: "text-right" },
                            React.createElement("p", { className: "text-sm text-gray-300" }, "Balance"),
                            React.createElement("p", { "aria-label": "Card balance" }, card.balance))))); })))),
        React.createElement("div", { className: "space-y-6" },
            React.createElement("div", { className: "bg-slate-800 rounded-xl p-6" },
                React.createElement("h2", { className: "text-lg font-medium mb-4" }, "Card Settings"),
                React.createElement("form", { className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "dailyLimit", className: "text-sm text-gray-400" }, "Daily Limit"),
                        React.createElement("input", { type: "number", id: "dailyLimit", name: "dailyLimit", className: "w-full bg-slate-700 rounded-lg px-4 py-2 mt-1", placeholder: "$1,000", "aria-label": "Set daily spending limit" })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "securitySelect", className: "text-sm text-gray-400" }, "Security"),
                        React.createElement("select", { id: "securitySelect", name: "security", className: "w-full bg-slate-700 rounded-lg px-4 py-2 mt-1 relative z-50", "aria-label": "Security settings" },
                            React.createElement("option", { value: "3d_secure" }, "3D Secure enabled"),
                            React.createElement("option", { value: "physical" }, "Only physical presence"),
                            React.createElement("option", { value: "all" }, "All transactions"))),
                    React.createElement("button", { type: "button", className: "w-full bg-red-600 py-2 rounded-lg hover:bg-red-500 transition-colors", "aria-label": "Freeze all virtual cards" }, "Freeze All Cards"))),
            React.createElement("div", { className: "bg-slate-800 rounded-xl p-6" },
                React.createElement("h2", { className: "text-lg font-medium mb-4" }, "Quick Actions"),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("button", { className: "w-full bg-violet-600 py-2 rounded-lg hover:bg-violet-500 transition-colors", "aria-label": "Add funds to card balance" }, "Top Up Balance"),
                    React.createElement("button", { className: "w-full bg-violet-600 py-2 rounded-lg hover:bg-violet-500 transition-colors", "aria-label": "View transaction history" }, "View Transactions"))))));
};
