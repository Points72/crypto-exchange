// wallet-connect.tsx
'use client';
"use strict";
exports.__esModule = true;
exports.WalletConnect = void 0;
var react_1 = require("@web3modal/react");
var button_1 = require("./ui/button"); // Assuming this is a custom UI component
var wagmi_1 = require("wagmi");
var lucide_react_1 = require("lucide-react");
var react_2 = require("react");
function WalletConnect() {
    var open = react_1.useWeb3Modal().open;
    var _a = wagmi_1.useAccount(), address = _a.address, isConnected = _a.isConnected;
    var disconnect = wagmi_1.useDisconnect().disconnect;
    var _b = react_2.useState(false), mounted = _b[0], setMounted = _b[1];
    // Prevent hydration mismatch errors in Next.js
    react_2.useEffect(function () {
        setMounted(true);
    }, []);
    if (!mounted)
        return null;
    if (isConnected && address) {
        return (React.createElement("div", { className: "flex items-center gap-2" },
            React.createElement("span", { className: "text-sm text-gray-300" }, address.slice(0, 6) + "..." + address.slice(-4)),
            React.createElement(button_1.Button, { onClick: function () { return disconnect(); }, size: "icon", variant: "ghost", className: "h-8 w-8 rounded-full bg-[#4A90E2]/20 hover:bg-[#4A90E2]/30" },
                React.createElement(lucide_react_1.LogOut, { className: "h-4 w-4 text-[#7A88FF]" }))));
    }
    return (React.createElement(button_1.Button, { onClick: function () { return open(); }, className: "bg-[#4A90E2] hover:bg-[#4A90E2]/90" }, "Connect Wallet"));
}
exports.WalletConnect = WalletConnect;
