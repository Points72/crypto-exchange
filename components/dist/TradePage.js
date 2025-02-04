"use client";
"use strict";
exports.__esModule = true;
var trade_chart_1 = require("@/components/trade-chart");
var trade_controls_1 = require("@/components/trade-controls");
function TradePage() {
    return (React.createElement("div", { className: "max-w-4xl mx-auto mt-6 p-4 bg-[#0A0B1E] rounded-lg shadow-lg" },
        React.createElement("h1", { className: "text-xl font-bold text-white mb-4" }, "Trading Page"),
        React.createElement(trade_chart_1["default"], { symbol: "BTC/USDT" }),
        React.createElement("div", { className: "mt-4" },
            React.createElement(trade_controls_1["default"], null))));
}
exports["default"] = TradePage;
