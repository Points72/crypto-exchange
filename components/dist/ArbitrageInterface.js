"use client";
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
exports.ArbitrageInterface = void 0;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var arbitrage_1 = require("@/lib/arbitrage");
var exchange_api_1 = require("@/lib/exchange-api");
var useDebounce_1 = require("@/hooks/useDebounce");
var use_mobile_1 = require("@/hooks/use-mobile");
var scroll_area_1 = require("@/components/ui/scroll-area");
var resizable_1 = require("@/components/ui/resizable");
function ArbitrageInterface() {
    var _this = this;
    var _a = react_1.useState('scanner'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = react_1.useState(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = react_1.useState([]), opportunities = _c[0], setOpportunities = _c[1];
    var _d = react_1.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var _e = react_1.useState(null), error = _e[0], setError = _e[1];
    var chartContainerRef = react_1.useRef(null);
    var isMobile = use_mobile_1.useMobile();
    var debouncedSearch = useDebounce_1.useDebounce(searchTerm, 300);
    var exchanges = react_1.useMemo(function () { return [
        exchange_api_1.createExchangeAPI('bingx', {
            apiKey: process.env.NEXT_PUBLIC_BINGX_API_KEY || '',
            apiSecret: process.env.NEXT_PUBLIC_BINGX_API_SECRET || ''
        }),
        exchange_api_1.createExchangeAPI('bybit', {
            apiKey: process.env.NEXT_PUBLIC_BYBIT_API_KEY || '',
            apiSecret: process.env.NEXT_PUBLIC_BYBIT_API_SECRET || ''
        }),
        exchange_api_1.createExchangeAPI('mexc', {
            apiKey: process.env.NEXT_PUBLIC_MEXC_API_KEY || '',
            apiSecret: process.env.NEXT_PUBLIC_MEXC_API_SECRET || ''
        }),
        exchange_api_1.createExchangeAPI('kucoin', {
            apiKey: process.env.NEXT_PUBLIC_KUCOIN_API_KEY || '',
            apiSecret: process.env.NEXT_PUBLIC_KUCOIN_API_SECRET || '',
            passphrase: process.env.NEXT_PUBLIC_KUCOIN_PASSPHRASE
        }),
        exchange_api_1.createExchangeAPI('okx', {
            apiKey: process.env.NEXT_PUBLIC_OKX_API_KEY || '',
            apiSecret: process.env.NEXT_PUBLIC_OKX_API_SECRET || '',
            passphrase: process.env.NEXT_PUBLIC_OKX_PASSPHRASE
        })
    ]; }, []);
    var symbols = react_1.useMemo(function () { return ['BTC/USDT', 'ETH/USDT', 'SOL/USDT']; }, []);
    react_1.useEffect(function () {
        var fetchOpportunities = function () { return __awaiter(_this, void 0, void 0, function () {
            var results, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, arbitrage_1.findArbitrageOpportunities(exchanges, symbols)];
                    case 2:
                        results = _a.sent();
                        setOpportunities(results);
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        setError(err_1 instanceof Error ? err_1.message : 'An error occurred');
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchOpportunities();
        var interval = setInterval(fetchOpportunities, 10000);
        return function () { return clearInterval(interval); };
    }, [exchanges, symbols]);
    var filteredOpportunities = opportunities.filter(function (opp) {
        return opp.pair.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            opp.fromExchange.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            opp.toExchange.toLowerCase().includes(debouncedSearch.toLowerCase());
    });
    return (React.createElement(resizable_1.ResizablePanelGroup, { direction: isMobile ? 'vertical' : 'horizontal' },
        React.createElement(resizable_1.ResizablePanel, { defaultSize: 60 },
            React.createElement("div", { className: "bg-[#0A0B1E] p-6 rounded-xl h-full" },
                React.createElement("h2", { className: "text-xl font-bold mb-4 text-[#7A88FF]" }, "Arbitrage"),
                React.createElement("div", { className: "flex flex-wrap gap-4 mb-6" },
                    React.createElement("button", { onClick: function () { return setActiveTab('scanner'); }, className: "flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center " + (activeTab === 'scanner'
                            ? 'bg-blue-500/20 text-blue-500'
                            : 'bg-[#1A1B3E] text-gray-400') },
                        React.createElement(lucide_react_1.Activity, { size: 18 }),
                        "Scanner"),
                    React.createElement("button", { onClick: function () { return setActiveTab('bots'); }, className: "flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center " + (activeTab === 'bots'
                            ? 'bg-blue-500/20 text-blue-500'
                            : 'bg-[#1A1B3E] text-gray-400') },
                        React.createElement(lucide_react_1.Bot, { size: 18 }),
                        "Bots")),
                React.createElement("div", { className: "relative mb-4" },
                    React.createElement("input", { type: "text", placeholder: activeTab === 'scanner' ? "Search pairs..." : "Search bots...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "w-full bg-[#1A1B3E] p-2 pl-9 rounded-lg text-sm" }),
                    React.createElement(lucide_react_1.Search, { className: "absolute left-2 top-2 text-gray-400", size: 16 })),
                React.createElement(scroll_area_1.ScrollArea, { className: "h-[calc(100vh-250px)]" }, isLoading ? (React.createElement("div", { className: "flex items-center justify-center h-40" },
                    React.createElement("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" }))) : error ? (React.createElement("div", { className: "text-red-500 p-4" }, error)) : (React.createElement("div", { className: "space-y-2" }, filteredOpportunities.map(function (opp, idx) { return (React.createElement("div", { key: idx, className: "bg-[#1A1B3E] p-3 rounded-lg text-sm" },
                    React.createElement("div", { className: "flex flex-wrap items-center justify-between mb-2" },
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement("span", { className: "text-gray-400" }, opp.fromExchange),
                            React.createElement(lucide_react_1.ArrowRight, { size: 16, className: "text-blue-500" }),
                            React.createElement("span", { className: "text-gray-400" }, opp.toExchange)),
                        React.createElement("div", { className: "text-green-500" },
                            "+",
                            opp.priceDiff.toFixed(8),
                            "%")),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "text-gray-400" }, "Pair: "),
                            React.createElement("span", { className: "text-white" }, opp.pair)),
                        React.createElement("div", null,
                            React.createElement("span", { className: "text-gray-400" }, "Volume 24h: "),
                            React.createElement("span", { className: "text-white" },
                                "$",
                                opp.volume24h.toFixed(2)))))); })))))),
        React.createElement(resizable_1.ResizablePanel, { defaultSize: 40 },
            React.createElement("div", { ref: chartContainerRef, className: "w-full h-full" }))));
}
exports.ArbitrageInterface = ArbitrageInterface;
