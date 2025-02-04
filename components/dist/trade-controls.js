"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function TradeControls() {
    var _a = react_1.useState(""), amount = _a[0], setAmount = _a[1];
    var _b = react_1.useState(10), leverage = _b[0], setLeverage = _b[1];
    var _c = react_1.useState("long"), side = _c[0], setSide = _c[1];
    var handleTrade = function () {
        alert("Executing " + side.toUpperCase() + " trade with " + amount + " USDT and " + leverage + "x leverage");
    };
    return (React.createElement("div", { className: "bg-[#1A1B3E] p-4 rounded-md shadow-lg" },
        React.createElement("h2", { className: "text-lg font-bold text-white" }, "Trade Controls"),
        React.createElement("div", { className: "flex flex-col space-y-3" },
            React.createElement("div", null,
                React.createElement("label", { className: "text-gray-300" }, "Amount (USDT)"),
                React.createElement("input", { type: "number", value: amount, onChange: function (e) { return setAmount(e.target.value); }, className: "w-full p-2 mt-1 rounded bg-[#0A0B1E] text-white" })),
            React.createElement("div", null,
                React.createElement("label", { className: "text-gray-300" }, "Leverage"),
                React.createElement("input", { type: "range", min: "1", max: "100", value: leverage, onChange: function (e) { return setLeverage(parseInt(e.target.value)); }, className: "w-full" }),
                React.createElement("span", { className: "text-white" },
                    leverage,
                    "x")),
            React.createElement("div", { className: "flex space-x-2" },
                React.createElement("button", { onClick: function () { return setSide("long"); }, className: "px-4 py-2 rounded-md " + (side === "long" ? "bg-green-500" : "bg-gray-500") }, "Long"),
                React.createElement("button", { onClick: function () { return setSide("short"); }, className: "px-4 py-2 rounded-md " + (side === "short" ? "bg-red-500" : "bg-gray-500") }, "Short")),
            React.createElement("button", { onClick: handleTrade, className: "bg-blue-500 px-4 py-2 rounded-md text-white" }, "Execute Trade"))));
}
exports["default"] = TradeControls;
