"use client";
"use strict";
exports.__esModule = true;
exports.TransferSection = void 0;
var react_1 = require("react");
exports.TransferSection = function () {
    // Используем типизированный state для истории
    var history = react_1.useState([
        {
            id: 1,
            type: "Send",
            token: "ETH",
            amount: "1.5",
            to: "0x1234...5678",
            status: "Completed",
            timestamp: "2024-01-30 14:22"
        },
        {
            id: 2,
            type: "Receive",
            token: "USDT",
            amount: "500",
            from: "0x8765...4321",
            status: "Pending",
            timestamp: "2024-01-30 14:20"
        },
    ])[0];
    return (React.createElement("div", { className: "grid grid-cols-2 gap-6" },
        React.createElement("div", { className: "bg-slate-800 rounded-xl p-6" },
            React.createElement("h2", { className: "text-lg font-medium mb-6" }, "Send Assets"),
            React.createElement("form", { className: "space-y-4" },
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "assetSelect", className: "text-sm text-gray-400" }, "Asset"),
                    React.createElement("select", { id: "assetSelect", name: "asset", className: "w-full bg-slate-700 rounded-lg px-4 py-2 mt-1", "aria-label": "Select asset to send" },
                        React.createElement("option", { value: "ETH" }, "ETH"),
                        React.createElement("option", { value: "USDT" }, "USDT"),
                        React.createElement("option", { value: "USDC" }, "USDC"))),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "transferAmount", className: "text-sm text-gray-400" }, "Amount"),
                    React.createElement("input", { type: "number", id: "transferAmount", name: "amount", className: "w-full bg-slate-700 rounded-lg px-4 py-2 mt-1", placeholder: "0.0", "aria-label": "Enter transfer amount", min: "0", step: "any" })),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "recipientAddress", className: "text-sm text-gray-400" }, "Recipient Address"),
                    React.createElement("input", { type: "text", id: "recipientAddress", name: "recipient", className: "w-full bg-slate-700 rounded-lg px-4 py-2 mt-1", placeholder: "0x...", "aria-label": "Enter recipient wallet address" })),
                React.createElement("button", { type: "submit", className: "w-full bg-violet-600 py-3 rounded-lg hover:bg-violet-500 transition-colors", "aria-label": "Send transaction" }, "Send"))),
        React.createElement("div", { className: "bg-slate-800 rounded-xl p-6" },
            React.createElement("h2", { className: "text-lg font-medium mb-6" }, "Transfer History"),
            React.createElement("div", { className: "space-y-4", role: "list", "aria-label": "Transaction history" }, history.map(function (item) { return (React.createElement("div", { key: item.id, className: "bg-slate-700 rounded-lg p-4", role: "listitem" },
                React.createElement("div", { className: "flex justify-between items-center mb-2" },
                    React.createElement("span", { className: item.type === "Send" ? "text-red-400" : "text-green-400", "aria-label": "Transaction type: " + item.type }, item.type),
                    React.createElement("span", { className: "text-sm text-gray-400", "aria-label": "Transaction time" }, item.timestamp)),
                React.createElement("div", { className: "grid grid-cols-2 gap-2 text-sm" },
                    React.createElement("p", { "aria-label": "Transaction amount" },
                        "Amount: ",
                        item.amount,
                        " ",
                        item.token),
                    React.createElement("p", { className: "text-right" },
                        item.type === "Send" ? "To: " : "From: ",
                        React.createElement("span", { className: "text-gray-400", "aria-label": (item.type === "Send" ? "Recipient" : "Sender") + " address" }, item.type === "Send" ? item.to : item.from))))); })))));
};
