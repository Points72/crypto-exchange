'use client';
"use strict";
exports.__esModule = true;
exports.AppKitProvider = void 0;
var react_1 = require("@reown/appkit/react");
var wagmi_1 = require("wagmi");
var networks_1 = require("@reown/appkit/networks");
var react_query_1 = require("@tanstack/react-query");
var appkit_adapter_wagmi_1 = require("@reown/appkit-adapter-wagmi");
// 0. Setup queryClient
var queryClient = new react_query_1.QueryClient();
// 1. Get projectId from https://cloud.reown.com
var projectId = '2bb3b16994fef5232896dac751558dc2';
// 2. Create a metadata object - optional
var metadata = {
    name: 'ClaudeDex',
    description: 'AppKit Example',
    uri: 'https://reown.com/appkit',
    icons: ['https://assets.reown.com/reown-profile-pic.png']
};
// 3. Set the networks
var networks = [networks_1.mainnet, networks_1.arbitrum];
// 4. Create wagmi Adapter
var wagmiAdapter = new appkit_adapter_wagmi_1.WagmiAdapter({
    networks: networks,
    projectId: projectId,
    ssr: true
});
// 5. Create modal
react_1.createAppKit({
    adapters: [wagmiAdapter],
    networks: networks,
    projectId: projectId,
    metadata: metadata,
    features: {
        analytics: true // Optional - defaults to your cloud configuration
    }
});
function AppKitProvider(_a) {
    var children = _a.children;
    return (React.createElement(wagmi_1.WagmiProvider, { config: wagmiAdapter.wagmiConfig },
        React.createElement(react_query_1.QueryClientProvider, { client: queryClient }, children)));
}
exports.AppKitProvider = AppKitProvider;
