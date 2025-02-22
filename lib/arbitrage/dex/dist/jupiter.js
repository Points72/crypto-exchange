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
exports.JupiterService = void 0;
var web3_js_1 = require("@solana/web3.js");
var api_1 = require("@jup-ag/api");
var JupiterService = /** @class */ (function () {
    function JupiterService(connection) {
        this.connection = connection;
    }
    JupiterService.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, api_1.Jupiter.load({
                                connection: this.connection,
                                cluster: 'mainnet-beta'
                            })];
                    case 1:
                        _a.jupiter = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    JupiterService.prototype.getQuote = function (inputMint, outputMint, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var routes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.jupiter) {
                            throw new Error('Jupiter not initialized');
                        }
                        return [4 /*yield*/, this.jupiter.computeRoutes({
                                inputMint: new web3_js_1.PublicKey(inputMint),
                                outputMint: new web3_js_1.PublicKey(outputMint),
                                amount: amount,
                                slippageBps: 50
                            })];
                    case 1:
                        routes = _a.sent();
                        return [2 /*return*/, routes.routesInfos[0]];
                }
            });
        });
    };
    JupiterService.prototype.executeSwap = function (route, wallet) {
        return __awaiter(this, void 0, void 0, function () {
            var transactions, signedTx, txid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.jupiter) {
                            throw new Error('Jupiter not initialized');
                        }
                        return [4 /*yield*/, this.jupiter.exchange({
                                route: route,
                                userPublicKey: wallet.publicKey
                            })];
                    case 1:
                        transactions = (_a.sent()).transactions;
                        return [4 /*yield*/, wallet.signTransaction(transactions.swapTransaction)];
                    case 2:
                        signedTx = _a.sent();
                        return [4 /*yield*/, this.connection.sendRawTransaction(signedTx.serialize())];
                    case 3:
                        txid = _a.sent();
                        return [2 /*return*/, txid];
                }
            });
        });
    };
    return JupiterService;
}());
exports.JupiterService = JupiterService;
