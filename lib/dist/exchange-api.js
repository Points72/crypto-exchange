"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
exports.createExchangeAPI = exports.Exchange = void 0;
var crypto_1 = require("crypto");
var Exchange = /** @class */ (function () {
    function Exchange(credentials, name, exchange) {
        this.credentials = credentials;
        this.name = name;
        this.exchange = exchange;
    }
    return Exchange;
}());
exports.Exchange = Exchange;
var BingxAPI = /** @class */ (function (_super) {
    __extends(BingxAPI, _super);
    function BingxAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BASE_URL = 'https://api.bingx.com';
        return _this;
    }
    BingxAPI.prototype.makeRequest = function (endpoint, params) {
        return __awaiter(this, void 0, Promise, function () {
            var timestamp, queryParams, signature, url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = Date.now().toString();
                        queryParams = __assign(__assign({}, params), { timestamp: timestamp });
                        signature = this.generateSignature(queryParams);
                        url = new URL("" + this.BASE_URL + endpoint);
                        url.search = new URLSearchParams(__assign(__assign({}, queryParams), { signature: signature })).toString();
                        return [4 /*yield*/, fetch(url.toString(), {
                                headers: new Headers({
                                    'X-MBX-APIKEY': this.credentials.apiKey
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Bingx API error: " + response.statusText);
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    BingxAPI.prototype.generateSignature = function (params) {
        var queryString = new URLSearchParams(Object.entries(params).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, String(value)];
        })).toString();
        return crypto_1["default"]
            .createHmac('sha256', this.credentials.apiSecret)
            .update(queryString)
            .digest('hex');
    };
    BingxAPI.prototype.createOrder = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/api/v3/order', __assign({ symbol: params.symbol, side: params.side.toUpperCase(), type: params.type.toUpperCase(), quantity: params.quantity }, (params.price && { price: params.price })))];
            });
        });
    };
    BingxAPI.prototype.getBalance = function (asset) {
        return __awaiter(this, void 0, Promise, function () {
            var response, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/api/v3/account', {})];
                    case 1:
                        response = _a.sent();
                        balance = response.balances.find(function (b) { return b.asset === asset; });
                        return [2 /*return*/, balance ? parseFloat(balance.free) : 0];
                }
            });
        });
    };
    BingxAPI.prototype.getOrderBook = function (symbol) {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/api/v3/depth', {
                            symbol: symbol,
                            limit: 20
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                bids: response.bids.map(function (_a) {
                                    var price = _a[0], amount = _a[1];
                                    return ({
                                        price: parseFloat(price),
                                        amount: parseFloat(amount)
                                    });
                                }),
                                asks: response.asks.map(function (_a) {
                                    var price = _a[0], amount = _a[1];
                                    return ({
                                        price: parseFloat(price),
                                        amount: parseFloat(amount)
                                    });
                                })
                            }];
                }
            });
        });
    };
    return BingxAPI;
}(Exchange));
var BybitAPI = /** @class */ (function (_super) {
    __extends(BybitAPI, _super);
    function BybitAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BASE_URL = 'https://api.bybit.com';
        return _this;
    }
    BybitAPI.prototype.makeRequest = function (endpoint, params) {
        return __awaiter(this, void 0, Promise, function () {
            var timestamp, signature, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = Date.now().toString();
                        signature = this.generateSignature(__assign(__assign({}, params), { timestamp: timestamp }));
                        return [4 /*yield*/, fetch("" + this.BASE_URL + endpoint, {
                                headers: new Headers({
                                    'api-key': this.credentials.apiKey,
                                    'api-signature': signature,
                                    'api-timestamp': timestamp
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Bybit API error: " + response.statusText);
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    BybitAPI.prototype.generateSignature = function (params) {
        var queryString = new URLSearchParams(Object.entries(params).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, String(value)];
        })).toString();
        return crypto_1["default"]
            .createHmac('sha256', this.credentials.apiSecret)
            .update(queryString)
            .digest('hex');
    };
    BybitAPI.prototype.createOrder = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/v2/private/order/create', __assign({ symbol: params.symbol, side: params.side.toUpperCase(), order_type: params.type.toUpperCase(), qty: params.quantity }, (params.price && { price: params.price })))];
            });
        });
    };
    BybitAPI.prototype.getBalance = function (asset) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/v2/private/wallet/balance', {
                            coin: asset
                        })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, parseFloat(((_a = response.result[asset]) === null || _a === void 0 ? void 0 : _a.available_balance) || '0')];
                }
            });
        });
    };
    BybitAPI.prototype.getOrderBook = function (symbol) {
        return __awaiter(this, void 0, Promise, function () {
            var response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/v2/public/orderBook/L2', {
                            symbol: symbol
                        })];
                    case 1:
                        response = _a.sent();
                        orders = response.result;
                        return [2 /*return*/, {
                                bids: orders
                                    .filter(function (order) { return order.side === 'Buy'; })
                                    .map(function (order) { return ({
                                    price: parseFloat(order.price),
                                    amount: parseFloat(order.size)
                                }); }),
                                asks: orders
                                    .filter(function (order) { return order.side === 'Sell'; })
                                    .map(function (order) { return ({
                                    price: parseFloat(order.price),
                                    amount: parseFloat(order.size)
                                }); })
                            }];
                }
            });
        });
    };
    return BybitAPI;
}(Exchange));
var MEXCAPI = /** @class */ (function (_super) {
    __extends(MEXCAPI, _super);
    function MEXCAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BASE_URL = 'https://api.mexc.com';
        return _this;
    }
    MEXCAPI.prototype.makeRequest = function (endpoint, params) {
        return __awaiter(this, void 0, Promise, function () {
            var timestamp, signature, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = Date.now().toString();
                        signature = this.generateSignature(__assign(__assign({}, params), { timestamp: timestamp }));
                        return [4 /*yield*/, fetch("" + this.BASE_URL + endpoint, {
                                headers: new Headers({
                                    'X-MEXC-APIKEY': this.credentials.apiKey,
                                    'X-MEXC-SIGNATURE': signature,
                                    'X-MEXC-TIMESTAMP': timestamp
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("MEXC API error: " + response.statusText);
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    MEXCAPI.prototype.generateSignature = function (params) {
        var queryString = new URLSearchParams(Object.entries(params).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, String(value)];
        })).toString();
        return crypto_1["default"]
            .createHmac('sha256', this.credentials.apiSecret)
            .update(queryString)
            .digest('hex');
    };
    MEXCAPI.prototype.createOrder = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/api/v3/order', __assign({ symbol: params.symbol, side: params.side.toUpperCase(), type: params.type.toUpperCase(), quantity: params.quantity }, (params.price && { price: params.price })))];
            });
        });
    };
    MEXCAPI.prototype.getBalance = function (asset) {
        return __awaiter(this, void 0, Promise, function () {
            var response, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/api/v3/account', {})];
                    case 1:
                        response = _a.sent();
                        balance = response.balances.find(function (b) { return b.asset === asset; });
                        return [2 /*return*/, balance ? parseFloat(balance.free) : 0];
                }
            });
        });
    };
    MEXCAPI.prototype.getOrderBook = function (symbol) {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/api/v3/depth', {
                            symbol: symbol,
                            limit: 20
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                bids: response.bids.map(function (_a) {
                                    var price = _a[0], amount = _a[1];
                                    return ({
                                        price: parseFloat(price),
                                        amount: parseFloat(amount)
                                    });
                                }),
                                asks: response.asks.map(function (_a) {
                                    var price = _a[0], amount = _a[1];
                                    return ({
                                        price: parseFloat(price),
                                        amount: parseFloat(amount)
                                    });
                                })
                            }];
                }
            });
        });
    };
    return MEXCAPI;
}(Exchange));
var KuCoinAPI = /** @class */ (function (_super) {
    __extends(KuCoinAPI, _super);
    function KuCoinAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BASE_URL = 'https://api.kucoin.com';
        return _this;
    }
    KuCoinAPI.prototype.makeRequest = function (endpoint, params) {
        return __awaiter(this, void 0, Promise, function () {
            var timestamp, signature, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = Date.now().toString();
                        signature = this.generateSignature(__assign(__assign({}, params), { timestamp: timestamp }));
                        return [4 /*yield*/, fetch("" + this.BASE_URL + endpoint, {
                                headers: new Headers({
                                    'KC-API-KEY': this.credentials.apiKey,
                                    'KC-API-SIGN': signature,
                                    'KC-API-TIMESTAMP': timestamp,
                                    'KC-API-PASSPHRASE': this.credentials.passphrase || ''
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("KuCoin API error: " + response.statusText);
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    KuCoinAPI.prototype.generateSignature = function (params) {
        var queryString = new URLSearchParams(Object.entries(params).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, String(value)];
        })).toString();
        return crypto_1["default"]
            .createHmac('sha256', this.credentials.apiSecret)
            .update(queryString)
            .digest('base64');
    };
    KuCoinAPI.prototype.createOrder = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/api/v1/orders', __assign({ symbol: params.symbol, side: params.side.toUpperCase(), type: params.type.toUpperCase(), size: params.quantity }, (params.price && { price: params.price })))];
            });
        });
    };
    KuCoinAPI.prototype.getBalance = function (asset) {
        return __awaiter(this, void 0, Promise, function () {
            var response, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/api/v1/accounts', {
                            currency: asset,
                            type: 'trade'
                        })];
                    case 1:
                        response = _a.sent();
                        balance = response.data.find(function (b) { return b.currency === asset; });
                        return [2 /*return*/, balance ? parseFloat(balance.available) : 0];
                }
            });
        });
    };
    KuCoinAPI.prototype.getOrderBook = function (symbol) {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/api/v1/market/orderbook/level2_20', {
                            symbol: symbol
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                bids: response.data.bids.map(function (_a) {
                                    var price = _a[0], amount = _a[1];
                                    return ({
                                        price: parseFloat(price),
                                        amount: parseFloat(amount)
                                    });
                                }),
                                asks: response.data.asks.map(function (_a) {
                                    var price = _a[0], amount = _a[1];
                                    return ({
                                        price: parseFloat(price),
                                        amount: parseFloat(amount)
                                    });
                                })
                            }];
                }
            });
        });
    };
    return KuCoinAPI;
}(Exchange));
var OKXAPI = /** @class */ (function (_super) {
    __extends(OKXAPI, _super);
    function OKXAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BASE_URL = 'https://www.okx.com';
        return _this;
    }
    OKXAPI.prototype.makeRequest = function (endpoint, params) {
        return __awaiter(this, void 0, Promise, function () {
            var timestamp, signature, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = new Date().toISOString();
                        signature = this.generateSignature(__assign(__assign({}, params), { timestamp: timestamp }));
                        return [4 /*yield*/, fetch("" + this.BASE_URL + endpoint, {
                                headers: new Headers({
                                    'OK-ACCESS-KEY': this.credentials.apiKey,
                                    'OK-ACCESS-SIGN': signature,
                                    'OK-ACCESS-TIMESTAMP': timestamp,
                                    'OK-ACCESS-PASSPHRASE': this.credentials.passphrase || ''
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("OKX API error: " + response.statusText);
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    OKXAPI.prototype.generateSignature = function (params) {
        var queryString = new URLSearchParams(Object.entries(params).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, String(value)];
        })).toString();
        return crypto_1["default"]
            .createHmac('sha256', this.credentials.apiSecret)
            .update(queryString)
            .digest('base64');
    };
    OKXAPI.prototype.createOrder = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/api/v5/trade/order', __assign({ instId: params.symbol.replace('/', '-'), tdMode: 'cash', side: params.side.toLowerCase(), ordType: params.type.toLowerCase(), sz: params.quantity }, (params.price && { px: params.price })))];
            });
        });
    };
    OKXAPI.prototype.getBalance = function (asset) {
        return __awaiter(this, void 0, Promise, function () {
            var response, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/api/v5/account/balance', {
                            ccy: asset
                        })];
                    case 1:
                        response = _a.sent();
                        balance = response.data[0].details.find(function (d) { return d.ccy === asset; });
                        return [2 /*return*/, balance ? parseFloat(balance.availBal) : 0];
                }
            });
        });
    };
    OKXAPI.prototype.getOrderBook = function (symbol) {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/api/v5/market/books', {
                            instId: symbol.replace('/', '-'),
                            sz: 20
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                bids: response.data[0].bids.map(function (_a) {
                                    var price = _a[0], amount = _a[1];
                                    return ({
                                        price: parseFloat(price),
                                        amount: parseFloat(amount)
                                    });
                                }),
                                asks: response.data[0].asks.map(function (_a) {
                                    var price = _a[0], amount = _a[1];
                                    return ({
                                        price: parseFloat(price),
                                        amount: parseFloat(amount)
                                    });
                                })
                            }];
                }
            });
        });
    };
    return OKXAPI;
}(Exchange));
function createExchangeAPI(exchange, credentials) {
    switch (exchange.toLowerCase()) {
        case 'bingx':
            return new BingxAPI(credentials, 'Bingx', 'bingx');
        case 'bybit':
            return new BybitAPI(credentials, 'Bybit', 'bybit');
        case 'mexc':
            return new MEXCAPI(credentials, 'MEXC', 'mexc');
        case 'kucoin':
            return new KuCoinAPI(credentials, 'KuCoin', 'kucoin');
        case 'okx':
            return new OKXAPI(credentials, 'OKX', 'okx');
        default:
            throw new Error("Unsupported exchange: " + exchange);
    }
}
exports.createExchangeAPI = createExchangeAPI;
