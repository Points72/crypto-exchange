"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ExchangeAPI = void 0;
var ExchangeAPI = /** @class */ (function () {
    function ExchangeAPI(jupiter, raydium, orca) {
        this.jupiter = jupiter;
        this.raydium = raydium;
        this.orca = orca;
    }
    ExchangeAPI.prototype.getBestRoute = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, jupiterQuote, raydiumQuote, orcaQuote, routes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.jupiter.getQuote(params.inputMint, params.outputMint, params.amount),
                            this.raydium.getQuote(params.inputMint, params.outputMint, params.amount),
                            this.orca.getQuote(params.inputMint, params.outputMint, params.amount)
                        ])];
                    case 1:
                        _a = _b.sent(), jupiterQuote = _a[0], raydiumQuote = _a[1], orcaQuote = _a[2];
                        routes = [
                            __assign(__assign({}, jupiterQuote), { dex: 'jupiter' }),
                            __assign(__assign({}, raydiumQuote), { dex: 'raydium' }),
                            __assign(__assign({}, orcaQuote), { dex: 'orca' })
                        ];
                        return [2 /*return*/, routes.reduce(function (best, current) {
                                return current.expectedOutput > best.expectedOutput ? current : best;
                            })];
                }
            });
        });
    };
    ExchangeAPI.prototype.getAllPools = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, jupiterPools, raydiumPools, orcaPools;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.jupiter.getPools(),
                            this.raydium.getPools(),
                            this.orca.getPools()
                        ])];
                    case 1:
                        _a = _b.sent(), jupiterPools = _a[0], raydiumPools = _a[1], orcaPools = _a[2];
                        return [2 /*return*/, __spreadArrays(jupiterPools, raydiumPools, orcaPools)];
                }
            });
        });
    };
    ExchangeAPI.prototype.getPoolByAddress = function (address) {
        return __awaiter(this, void 0, Promise, function () {
            var pools;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllPools()];
                    case 1:
                        pools = _a.sent();
                        return [2 /*return*/, pools.find(function (pool) { return pool.address === address; }) || null];
                }
            });
        });
    };
    return ExchangeAPI;
}());
exports.ExchangeAPI = ExchangeAPI;
