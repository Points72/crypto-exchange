"use client";
"use strict";
exports.__esModule = true;
exports.MoonPayWidget = void 0;
var react_1 = require("react");
var moonpay_react_1 = require("@moonpay/moonpay-react");
exports.MoonPayWidget = function () {
    var _a = react_1.useState(false), showWidget = _a[0], setShowWidget = _a[1];
    var apiKey = process.env.NEXT_PUBLIC_MOONPAY_API_KEY || "";
    if (!apiKey) {
        console.error("❌ NEXT_PUBLIC_MOONPAY_API_KEY is missing!");
        return null;
    }
    return (React.createElement(moonpay_react_1.MoonPayProvider, { apiKey: apiKey },
        React.createElement("button", { onClick: function () { return setShowWidget(true); }, className: "px-4 py-2 bg-gradient-to-r from-[#7A88FF] to-[#4A90E2] rounded-md font-medium shadow-lg shadow-[#7A88FF]/30 hover:shadow-[#7A88FF]/50 transition-all duration-300" }, "Buy Crypto"),
        showWidget && (React.createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
            React.createElement("div", { className: "bg-white rounded-lg overflow-hidden p-6 relative" },
                React.createElement("button", { onClick: function () { return setShowWidget(false); }, className: "absolute top-2 right-2 text-black" }, "\u2716"),
                React.createElement(moonpay_react_1.MoonPayBuyWidget, { variant: "embedded", baseCurrencyCode: "usd", baseCurrencyAmount: "100", defaultCurrencyCode: "eth", onCloseOverlay: function () { return setShowWidget(false); } }))))));
};
