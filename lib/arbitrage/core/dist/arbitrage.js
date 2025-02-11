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
exports.ArbitrageService = void 0;
var price_feed_1 = require("./price-feed");
var swap_service_1 = require("@/services/dex/swap.service");
var ArbitrageService = /** @class */ (function () {
    function ArbitrageService(connection) {
        this.connection = connection;
        this.priceFeed = new price_feed_1.PriceFeed(connection);
        this.swapService = new swap_service_1.SwapService(connection);
    }
    ArbitrageService.prototype.findArbitrageOpportunities = function (minProfitPercent) {
        if (minProfitPercent === void 0) { minProfitPercent = 1.0; }
        return __awaiter(this, void 0, Promise, function () {
            var opportunities, tokens, _i, tokens_1, inputToken, _a, tokens_2, outputToken, opportunity;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        opportunities = [];
                        return [4 /*yield*/, this.getTokenList()];
                    case 1:
                        tokens = _b.sent();
                        _i = 0, tokens_1 = tokens;
                        _b.label = 2;
                    case 2:
                        if (!(_i < tokens_1.length)) return [3 /*break*/, 7];
                        inputToken = tokens_1[_i];
                        _a = 0, tokens_2 = tokens;
                        _b.label = 3;
                    case 3:
                        if (!(_a < tokens_2.length)) return [3 /*break*/, 6];
                        outputToken = tokens_2[_a];
                        if (inputToken === outputToken)
                            return [3 /*break*/, 5];
                        return [4 /*yield*/, this.checkArbitrageOpportunity(inputToken, outputToken)];
                    case 4:
                        opportunity = _b.sent();
                        if (opportunity && opportunity.profitPercent >= minProfitPercent) {
                            opportunities.push(opportunity);
                        }
                        _b.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 3];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, opportunities.sort(function (a, b) { return b.profitPercent - a.profitPercent; })];
                }
            });
        });
    };
    ArbitrageService.prototype.checkArbitrageOpportunity = function (inputToken, outputToken) {
        return __awaiter(this, void 0, Promise, function () {
            var amount, prices, forwardPrice, backwardPrice, profitPercent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amount = 1000;
                        return [4 /*yield*/, Promise.all([
                                this.swapService.getBestPrice(inputToken, outputToken, amount),
                                this.swapService.getBestPrice(outputToken, inputToken, amount)
                            ])];
                    case 1:
                        prices = _a.sent();
                        forwardPrice = prices[0], backwardPrice = prices[1];
                        profitPercent = (backwardPrice.price / forwardPrice.price - 1) * 100;
                        if (profitPercent <= 0)
                            return [2 /*return*/, null];
                        return [2 /*return*/, {
                                buyDex: forwardPrice.dex,
                                sellDex: backwardPrice.dex,
                                inputToken: inputToken,
                                outputToken: outputToken,
                                profitPercent: profitPercent,
                                estimatedProfit: (profitPercent / 100) * amount
                            }];
                }
            });
        });
    };
    ArbitrageService.prototype.getTokenList = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                // Получение списка поддерживаемых токенов
                return [2 /*return*/, []];
            });
        });
    };
    return ArbitrageService;
}());
exports.ArbitrageService = ArbitrageService;
