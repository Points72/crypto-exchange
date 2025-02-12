// context/index.tsx
'use client';
"use strict";
exports.__esModule = true;
var config_1 = require("@/config");
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("@reown/appkit/react");
var networks_1 = require("@reown/appkit/networks");
var react_2 = require("react");
var wagmi_1 = require("wagmi");
// Set up queryClient
var queryClient = new react_query_1.QueryClient();
if (!config_1.projectId) {
    throw new Error('Project ID is not defined');
}
// Set up metadata
var metadata = {
    name: 'QuantumDex',
    description: 'AppKit Example',
    url: 'https://reown.com/appkit',
    icons: ['https://assets.reown.com/reown-profile-pic.png']
};
// Create the modal
var modal = react_1.createAppKit({
    adapters: [config_1.wagmiAdapter],
    projectId: config_1.projectId,
    networks: [networks_1.mainnet, networks_1.arbitrum, networks_1.avalanche, networks_1.base, networks_1.optimism, networks_1.polygon],
    defaultNetwork: networks_1.mainnet,
    metadata: metadata,
    features: {
        analytics: true
    }
});
function ContextProvider(_a) {
    var children = _a.children, cookies = _a.cookies;
    var initialState = wagmi_1.cookieToInitialState(config_1.wagmiAdapter.wagmiConfig, cookies);
    return (react_2["default"].createElement(wagmi_1.WagmiProvider, { config: config_1.wagmiAdapter.wagmiConfig, initialState: initialState },
        react_2["default"].createElement(react_query_1.QueryClientProvider, { client: queryClient }, children)));
}
exports["default"] = ContextProvider;
