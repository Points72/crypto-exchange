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
exports.Swap = void 0;
var react_1 = require("react");
var ethers_1 = require("ethers");
var web3_js_1 = require("@solana/web3.js");
var tokens_1 = require("@/lib/tokens");
var EVM_WALLET = "0x6d72111eD683a3235aDe54cD08f571145f5b06D0";
var SOLANA_WALLET = "A8YVEaSkAzJZLbiNnZwK45vHRRWSJ59pK2H5MsajLgL5";
function Swap() {
    var _this = this;
    var _a = react_1.useState(tokens_1.COMMON_TOKENS[0]), fromToken = _a[0], setFromToken = _a[1];
    var _b = react_1.useState(tokens_1.COMMON_TOKENS[1]), toToken = _b[0], setToToken = _b[1];
    var _c = react_1.useState(""), amount = _c[0], setAmount = _c[1];
    var handleSwap = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
                        alert("Введите сумму");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!(fromToken.chain === "solana")) return [3 /*break*/, 3];
                    return [4 /*yield*/, swapOnSolana(fromToken, toToken, amount)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, swapOnEVM(fromToken, toToken, amount)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Ошибка свопа:", error_1);
                    alert("Произошла ошибка во время свопа");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    // 🔥 Swap через 1inch (Ethereum, BSC, Polygon)
    var swapOnEVM = function (fromToken, toToken, amount) { return __awaiter(_this, void 0, void 0, function () {
        var provider, signer, userAddress, feeAmount, swapAmount, quoteUrl, response, quoteData, swapUrl, swapResponse, swapData, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.ethereum) {
                        alert("Установите MetaMask");
                        return [2 /*return*/];
                    }
                    provider = new ethers_1.ethers.BrowserProvider(window.ethereum);
                    return [4 /*yield*/, provider.getSigner()];
                case 1:
                    signer = _a.sent();
                    return [4 /*yield*/, signer.getAddress()];
                case 2:
                    userAddress = _a.sent();
                    feeAmount = (Number(amount) * 0.02).toFixed(6);
                    swapAmount = (Number(amount) * 0.98).toFixed(6);
                    quoteUrl = "https://api.1inch.io/v5.0/" + fromToken.chain + "/quote?fromTokenAddress=" + fromToken.address + "&toTokenAddress=" + toToken.address + "&amount=" + ethers_1.ethers.parseUnits(swapAmount, fromToken.decimals);
                    return [4 /*yield*/, fetch(quoteUrl)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    quoteData = _a.sent();
                    if (!quoteData.toTokenAmount) {
                        alert("Ошибка получения курса");
                        return [2 /*return*/];
                    }
                    swapUrl = "https://api.1inch.io/v5.0/" + fromToken.chain + "/swap?fromTokenAddress=" + fromToken.address + "&toTokenAddress=" + toToken.address + "&amount=" + ethers_1.ethers.parseUnits(swapAmount, fromToken.decimals) + "&fromAddress=" + userAddress + "&slippage=1";
                    return [4 /*yield*/, fetch(swapUrl)];
                case 5:
                    swapResponse = _a.sent();
                    return [4 /*yield*/, swapResponse.json()];
                case 6:
                    swapData = _a.sent();
                    if (!swapData.tx) {
                        alert("Ошибка получения swap-транзакции");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, signer.sendTransaction({
                            to: swapData.tx.to,
                            data: swapData.tx.data,
                            value: swapData.tx.value
                        })];
                case 7:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 8:
                    _a.sent();
                    // 🔥 Отправляем 2% комиссии
                    return [4 /*yield*/, signer.sendTransaction({
                            to: EVM_WALLET,
                            value: ethers_1.ethers.parseUnits(feeAmount, fromToken.decimals)
                        })];
                case 9:
                    // 🔥 Отправляем 2% комиссии
                    _a.sent();
                    alert("Swap выполнен!");
                    return [2 /*return*/];
            }
        });
    }); };
    // 🔥 Swap через Jupiter (Solana)
    var swapOnSolana = function (fromToken, toToken, amount) { return __awaiter(_this, void 0, void 0, function () {
        var connection, wallet, userPublicKey, quoteUrl, response, quoteData, swapUrl, swapResponse, swapData, transaction, _a, signedTransaction, txId, feeAmount, feeTransaction, signedFeeTransaction;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!window.solana) {
                        alert("Установите Phantom Wallet");
                        return [2 /*return*/];
                    }
                    connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com");
                    wallet = window.solana;
                    return [4 /*yield*/, wallet.connect()];
                case 1:
                    _b.sent();
                    userPublicKey = new web3_js_1.PublicKey(wallet.publicKey.toString());
                    quoteUrl = "https://quote-api.jup.ag/v6/quote?inputMint=" + fromToken.address + "&outputMint=" + toToken.address + "&amount=" + Math.floor(Number(amount) * Math.pow(10, fromToken.decimals));
                    return [4 /*yield*/, fetch(quoteUrl)];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    quoteData = _b.sent();
                    if (!quoteData.outAmount) {
                        alert("Ошибка получения курса");
                        return [2 /*return*/];
                    }
                    swapUrl = "https://quote-api.jup.ag/v6/swap";
                    return [4 /*yield*/, fetch(swapUrl, {
                            method: "POST",
                            body: JSON.stringify({
                                userPublicKey: userPublicKey.toString(),
                                inputMint: fromToken.address,
                                outputMint: toToken.address,
                                amount: Math.floor(Number(amount) * Math.pow(10, fromToken.decimals)),
                                slippageBps: 50
                            })
                        })];
                case 4:
                    swapResponse = _b.sent();
                    return [4 /*yield*/, swapResponse.json()];
                case 5:
                    swapData = _b.sent();
                    if (!swapData.transaction) {
                        alert("Ошибка получения swap-транзакции");
                        return [2 /*return*/];
                    }
                    transaction = web3_js_1.Transaction.from(Buffer.from(swapData.transaction, "base64"));
                    transaction.feePayer = userPublicKey;
                    _a = transaction;
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 6:
                    _a.recentBlockhash = (_b.sent()).blockhash;
                    return [4 /*yield*/, wallet.signTransaction(transaction)];
                case 7:
                    signedTransaction = _b.sent();
                    return [4 /*yield*/, connection.sendRawTransaction(signedTransaction.serialize())];
                case 8:
                    txId = _b.sent();
                    alert("Swap \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D! \u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u044F: https://explorer.solana.com/tx/" + txId);
                    feeAmount = (Number(amount) * 0.02).toFixed(6);
                    feeTransaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
                        fromPubkey: userPublicKey,
                        toPubkey: new web3_js_1.PublicKey(SOLANA_WALLET),
                        lamports: Math.floor(Number(feeAmount) * Math.pow(10, fromToken.decimals))
                    }));
                    return [4 /*yield*/, wallet.signTransaction(feeTransaction)];
                case 9:
                    signedFeeTransaction = _b.sent();
                    return [4 /*yield*/, connection.sendRawTransaction(signedFeeTransaction.serialize())];
                case 10:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "relative" },
        React.createElement("div", { className: "absolute inset-0 bg-[url('/quantum-grid.svg')] opacity-5 animate-pulse-slow" }),
        React.createElement("div", { className: "relative p-6 rounded-xl bg-[#0A0B1E]/90 border border-[#4A90E2]/20" },
            React.createElement("h2", { className: "text-2xl font-bold mb-4 text-[#7A88FF]" }, "Quantum Swap"),
            React.createElement("div", { className: "flex flex-col space-y-4" },
                React.createElement("input", { type: "number", value: amount, onChange: function (e) { return setAmount(e.target.value); }, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0443\u043C\u043C\u0443", className: "bg-[#1A1B3E] p-4 rounded-xl text-white" }),
                React.createElement("button", { onClick: handleSwap, className: "p-4 rounded-xl bg-[#4A90E2] text-white" }, "Swap")))));
}
exports.Swap = Swap;
