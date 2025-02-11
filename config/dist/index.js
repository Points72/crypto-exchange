"use strict";
// config/index.tsx
exports.__esModule = true;
exports.config = exports.wagmiAdapter = exports.networks = exports.projectId = void 0;
var core_1 = require("@wagmi/core");
var appkit_adapter_wagmi_1 = require("@reown/appkit-adapter-wagmi");
var networks_1 = require("@reown/appkit/networks");
// Get projectId from https://cloud.reown.com
exports.projectId = '2bb3b16994fef5232896dac751558dc2';
if (!exports.projectId) {
    throw new Error('Project ID is not defined');
}
exports.networks = [networks_1.mainnet, networks_1.arbitrum];
//Set up the Wagmi Adapter (Config)
exports.wagmiAdapter = new appkit_adapter_wagmi_1.WagmiAdapter({
    storage: core_1.createStorage({
        storage: core_1.cookieStorage
    }),
    ssr: true,
    projectId: exports.projectId,
    networks: exports.networks
});
exports.config = exports.wagmiAdapter.wagmiConfig;
