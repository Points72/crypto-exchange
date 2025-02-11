'use client';
"use strict";
exports.__esModule = true;
exports.WalletConnect = void 0;
var react_1 = require("@web3modal/react");
var button_1 = require("./ui/button");
var wagmi_1 = require("wagmi");
var lucide_react_1 = require("lucide-react");
var react_2 = require("react");
var utils_1 = require("@/lib/utils"); // Assuming you have utility class helper
function WalletConnect() {
    var open = react_1.useWeb3Modal().open;
    var _a = wagmi_1.useAccount(), address = _a.address, isConnected = _a.isConnected;
    var disconnect = wagmi_1.useDisconnect().disconnect;
    var _b = react_2.useState(false), mounted = _b[0], setMounted = _b[1];
    react_2.useEffect(function () {
        setMounted(true);
    }, []);
    if (!mounted)
        return (React.createElement(button_1.Button, { disabled: true, className: "bg-gray-500 animate-pulse" }, "Loading..."));
    if (isConnected && address) {
        return (React.createElement("div", { className: "flex items-center gap-2" },
            React.createElement("span", { className: "text-sm font-medium text-muted-foreground" }, address.slice(0, 6) + "..." + address.slice(-4)),
            React.createElement(button_1.Button, { onClick: function () { return disconnect(); }, size: "icon", variant: "outline", className: utils_1.cn("h-8 w-8 rounded-full", "transition-colors hover:bg-destructive/20", "border border-destructive/30 hover:border-destructive/50"), "aria-label": "Disconnect wallet" },
                React.createElement(lucide_react_1.LogOut, { className: "h-4 w-4 text-destructive" }))));
    }
    return (React.createElement(button_1.Button, { onClick: function () { return open(); }, className: utils_1.cn("bg-primary text-primary-foreground", "hover:bg-primary/90", "transition-colors duration-200") }, "Connect Wallet"));
}
exports.WalletConnect = WalletConnect;
