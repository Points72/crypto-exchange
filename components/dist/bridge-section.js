"use client";
"use strict";
exports.__esModule = true;
exports.BridgeSection = void 0;
var react_1 = require("react");
exports.BridgeSection = function () {
    var _a = react_1.useState("Ethereum"), fromChain = _a[0], setFromChain = _a[1];
    var _b = react_1.useState("Polygon"), toChain = _b[0], setToChain = _b[1];
    var _c = react_1.useState("USDT"), token = _c[0], setToken = _c[1];
    var _d = react_1.useState(""), amount = _d[0], setAmount = _d[1];
    var _e = react_1.useState("bridge"), activeTab = _e[0], setActiveTab = _e[1];
    var chains = [
        {
            name: "Ethereum",
            icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
            tokens: ["ETH", "USDT", "USDC"],
            gas: "25 GWEI",
            time: "~15 min"
        },
        {
            name: "Polygon",
            icon: "https://cryptologos.cc/logos/polygon-matic-logo.png",
            tokens: ["MATIC", "USDT", "USDC"],
            gas: "80 GWEI",
            time: "~5 min"
        },
        {
            name: "BSC",
            icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
            tokens: ["BNB", "USDT", "USDC"],
            gas: "5 GWEI",
            time: "~3 min"
        },
        {
            name: "Arbitrum",
            icon: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
            tokens: ["ETH", "USDT", "USDC"],
            gas: "0.1 GWEI",
            time: "~10 min"
        },
    ];
    return (React.createElement("div", { className: "grid grid-cols-3 gap-6" },
        React.createElement("div", { className: "col-span-2 space-y-6" },
            React.createElement("div", { className: "bg-slate-800 rounded-xl p-6" },
                React.createElement("h2", { className: "text-lg font-medium mb-6" }, "Bridge Assets"),
                React.createElement("div", { className: "space-y-6" },
                    React.createElement("div", { className: "bg-slate-700 p-4 rounded-lg" },
                        React.createElement("label", { htmlFor: "from-chain", className: "text-sm text-gray-400" }, "From Network"),
                        React.createElement("select", { id: "from-chain", value: fromChain, onChange: function (e) { return setFromChain(e.target.value); }, className: "w-full bg-slate-600 rounded-lg px-4 py-2 mt-2", "aria-label": "Select source blockchain" }, chains.map(function (chain) { return (React.createElement("option", { key: chain.name, value: chain.name }, chain.name)); }))),
                    React.createElement("div", { className: "flex justify-center" },
                        React.createElement("button", { onClick: function () {
                                var temp = fromChain;
                                setFromChain(toChain);
                                setToChain(temp);
                            }, className: "bg-slate-700 p-2 rounded-lg hover:bg-slate-600" }, "\u2191\u2193")),
                    React.createElement("div", { className: "bg-slate-700 p-4 rounded-lg" },
                        React.createElement("label", { htmlFor: "to-chain", className: "text-sm text-gray-400" }, "To Network"),
                        React.createElement("select", { id: "to-chain", value: toChain, onChange: function (e) { return setToChain(e.target.value); }, className: "w-full bg-slate-600 rounded-lg px-4 py-2 mt-2", "aria-label": "Select destination blockchain" }, chains.map(function (chain) { return (React.createElement("option", { key: chain.name, value: chain.name }, chain.name)); }))),
                    React.createElement("button", { className: "w-full bg-violet-600 py-3 rounded-lg hover:bg-violet-500 transition-colors" }, "Bridge Assets"))))));
};
