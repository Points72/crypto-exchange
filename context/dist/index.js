'use client';
"use strict";
exports.__esModule = true;
exports.ContextProvider = void 0;
var react_1 = require("@reown/appkit/react");
var react_query_1 = require("@tanstack/react-query");
var wagmi_1 = require("wagmi");
var config_1 = require("../config");
react_1.createAppKit({
    adapters: [config_1.wagmiAdapter],
    networks: config_1.networks,
    projectId: config_1.projectId,
    metadata: {
        name: 'ClaudeDex',
        description: 'DEX Exchange',
        uri: 'https://cryptopoint.am',
        icons: ['https://assets.reown.com/reown-profile-pic.png']
    }
});
function ContextProvider(_a) {
    var children = _a.children;
    var queryClient = new react_query_1.QueryClient();
    return (React.createElement(wagmi_1.WagmiProvider, { config: config_1.config },
        React.createElement(react_query_1.QueryClientProvider, { client: queryClient }, children)));
}
exports.ContextProvider = ContextProvider;
