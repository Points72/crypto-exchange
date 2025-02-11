"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.WormholeService = void 0;
var wormhole_sdk_1 = require("@certusone/wormhole-sdk");
var web3_js_1 = require("@solana/web3.js");
var ethers_1 = require("ethers");
var WormholeService = /** @class */ (function () {
    function WormholeService(solanaRpcUrl, ethereumRpcUrl, network) {
        if (network === void 0) { network = 'mainnet'; }
        this.context = new wormhole_sdk_1.Context(network);
        this.solanaConnection = new web3_js_1.Connection(solanaRpcUrl);
        this.ethereumProvider = new ethers_1.ethers.providers.JsonRpcProvider(ethereumRpcUrl);
    }
    WormholeService.prototype.bridgeToken = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenBridge, isSupported, tokenDetails, transferTx, txHash, signedTx, signer, tx, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        tokenBridge = this.context.getTokenBridge(params.sourceChain);
                        return [4 /*yield*/, tokenBridge.isTokenSupported(params.token)];
                    case 1:
                        isSupported = _a.sent();
                        if (!isSupported) {
                            throw new Error('Token not supported for bridging');
                        }
                        return [4 /*yield*/, tokenBridge.getTokenDetails(params.token)];
                    case 2:
                        tokenDetails = _a.sent();
                        return [4 /*yield*/, this.context.createTokenTransfer({
                                amount: params.amount,
                                tokenAddress: tokenDetails.address,
                                tokenChainId: params.sourceChain,
                                recipientChain: params.targetChain,
                                recipientAddress: params.recipient
                            })];
                    case 3:
                        transferTx = _a.sent();
                        txHash = void 0;
                        if (!(params.sourceChain === wormhole_sdk_1.CHAIN_ID_SOLANA)) return [3 /*break*/, 6];
                        return [4 /*yield*/, params.wallet.signTransaction(web3_js_1.Transaction.from(transferTx.transaction))];
                    case 4:
                        signedTx = _a.sent();
                        return [4 /*yield*/, this.solanaConnection.sendRawTransaction(signedTx.serialize())];
                    case 5:
                        txHash = _a.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        if (!(params.sourceChain === wormhole_sdk_1.CHAIN_ID_ETH)) return [3 /*break*/, 8];
                        signer = this.ethereumProvider.getSigner(params.wallet.address);
                        return [4 /*yield*/, signer.sendTransaction(transferTx.transaction)];
                    case 7:
                        tx = _a.sent();
                        txHash = tx.hash;
                        return [3 /*break*/, 9];
                    case 8: throw new Error('Unsupported source chain');
                    case 9: return [2 /*return*/, {
                            txHash: txHash,
                            sequence: transferTx.sequence,
                            emitterAddress: transferTx.emitterAddress
                        }];
                    case 10:
                        error_1 = _a.sent();
                        throw new Error("Bridge transaction failed: " + error_1.message);
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    WormholeService.prototype.getTransferStatus = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var vaa, targetTxHash, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.context.getVAA(params.txHash, params.sourceChain, params.targetChain)];
                    case 1:
                        vaa = _a.sent();
                        if (!vaa) {
                            return [2 /*return*/, {
                                    status: 'pending',
                                    txHash: params.txHash,
                                    timestamp: Date.now()
                                }];
                        }
                        return [4 /*yield*/, this.context.getTargetTransaction(vaa, params.targetChain)];
                    case 2:
                        targetTxHash = _a.sent();
                        return [2 /*return*/, {
                                status: targetTxHash ? 'completed' : 'pending',
                                txHash: params.txHash,
                                targetTxHash: targetTxHash,
                                timestamp: Date.now()
                            }];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                status: 'failed',
                                txHash: params.txHash,
                                timestamp: Date.now()
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WormholeService.prototype.getTokenList = function (chainId) {
        return __awaiter(this, void 0, Promise, function () {
            var tokenBridge, tokens, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tokenBridge = this.context.getTokenBridge(chainId);
                        return [4 /*yield*/, tokenBridge.getTokenList()];
                    case 1:
                        tokens = _a.sent();
                        return [2 /*return*/, tokens];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error("Failed to get token list: " + error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WormholeService.prototype.estimateFees = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var fees, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.context.estimateTransferFee({
                                sourceChain: params.sourceChain,
                                targetChain: params.targetChain,
                                token: params.token,
                                amount: params.amount
                            })];
                    case 1:
                        fees = _a.sent();
                        return [2 /*return*/, {
                                bridgeFee: fees.bridgeFee,
                                relayerFee: fees.relayerFee,
                                totalFee: fees.totalFee
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error("Failed to estimate fees: " + error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return WormholeService;
}());
exports.WormholeService = WormholeService;
