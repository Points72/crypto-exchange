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
exports.__esModule = true;
exports.useChart = void 0;
var react_1 = require("react");
var lightweight_charts_1 = require("lightweight-charts");
/**
 * Кастомный хук для создания графика.
 *
 * @param options Опции графика для функции createChart.
 * @returns Объект с ref контейнера и экземпляром графика.
 */
function useChart(options) {
    var containerRef = react_1.useRef(null);
    var chartRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (!containerRef.current)
            return;
        // Создаём график с переданными опциями и текущей шириной контейнера.
        chartRef.current = lightweight_charts_1.createChart(containerRef.current, __assign(__assign({}, options), { width: containerRef.current.clientWidth }));
        var handleResize = function () {
            if (chartRef.current && containerRef.current) {
                chartRef.current.applyOptions({
                    width: containerRef.current.clientWidth
                });
            }
        };
        window.addEventListener("resize", handleResize);
        // Очистка при размонтировании компонента.
        return function () {
            var _a;
            window.removeEventListener("resize", handleResize);
            (_a = chartRef.current) === null || _a === void 0 ? void 0 : _a.remove();
        };
    }, [options]);
    return { containerRef: containerRef, chart: chartRef.current };
}
exports.useChart = useChart;
