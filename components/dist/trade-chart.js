"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lightweight_charts_1 = require("lightweight-charts");
function TradeChart(_a) {
    var symbol = _a.symbol, _b = _a.interval, interval = _b === void 0 ? "1D" : _b;
    var chartContainerRef = react_1.useRef(null);
    var chartRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (!chartContainerRef.current)
            return;
        var chart = lightweight_charts_1.createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: { background: { color: "#0A0B1E" }, textColor: "#d1d5db" },
            grid: { vertLines: { color: "#333" }, horzLines: { color: "#333" } },
            crosshair: { mode: 1 }
        });
        var candlestickSeries = chart.addCandlestickSeries({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350"
        });
        chartRef.current = chart;
        window.addEventListener("resize", function () {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        });
        return function () {
            var _a;
            (_a = chartRef.current) === null || _a === void 0 ? void 0 : _a.remove();
            window.removeEventListener("resize", function () { });
        };
    }, [symbol]);
    return React.createElement("div", { ref: chartContainerRef, className: "w-full h-[400px] bg-[#0A0B1E] rounded-md" });
}
exports["default"] = TradeChart;
