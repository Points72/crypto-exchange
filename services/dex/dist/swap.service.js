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
exports.SwapService = void 0;
var jupiter_1 = require("@/lib/arbitrage/dex/jupiter");
var raydium_1 = require("@/lib/arbitrage/dex/raydium");
var orca_1 = require("@/lib/arbitrage/dex/orca");
var SwapService = /** @class */ (function () {
    function SwapService(connection) {
        this.jupiterService = new jupiter_1.JupiterService(connection);
        this.raydiumService = new raydium_1.RaydiumService(connection);
        this.orcaService = new orca_1.OrcaService(connection);
    }
    SwapService.prototype.getBestPrice = function (inputToken, outputToken, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, jupiterPrice, raydiumPrice, orcaPrice, prices;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.jupiterService.getQuote(inputToken, outputToken, amount),
                            this.raydiumService.getQuote(inputToken, outputToken, amount),
                            this.orcaService.getQuote(inputToken, outputToken, amount)
                        ])];
                    case 1:
                        _a = _b.sent(), jupiterPrice = _a[0], raydiumPrice = _a[1], orcaPrice = _a[2];
                        prices = [
                            { dex: 'Jupiter', price: jupiterPrice },
                            { dex: 'Raydium', price: raydiumPrice },
                            { dex: 'Orca', price: orcaPrice }
                        ];
                        return [2 /*return*/, prices.reduce(function (best, current) {
                                return current.price > best.price ? current : best;
                            })];
                }
            });
        });
    };
    SwapService.prototype.executeSwap = function (inputToken, outputToken, amount, wallet) {
        return __awaiter(this, void 0, void 0, function () {
            var bestRoute;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBestPrice(inputToken, outputToken, amount)];
                    case 1:
                        bestRoute = _a.sent();
                        switch (bestRoute.dex) {
                            case 'Jupiter':
                                return [2 /*return*/, this.jupiterService.executeSwap(bestRoute.price, wallet)];
                            case 'Raydium':
                                return [2 /*return*/, this.raydiumService.executeSwap(bestRoute.price, wallet)];
                            case 'Orca':
                                return [2 /*return*/, this.orcaService.executeSwap(bestRoute.price, wallet)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SwapService;
}());
exports.SwapService = SwapService;
