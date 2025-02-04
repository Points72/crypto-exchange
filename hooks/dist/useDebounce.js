"use strict";
exports.__esModule = true;
exports.useDebounce = void 0;
var react_1 = require("react");
/**
 * Кастомный хук для дебаунсинга значения.
 *
 * @param value Значение, которое нужно дебаунсить.
 * @param delay Задержка в миллисекундах.
 * @returns Дебаунсенное значение.
 */
function useDebounce(value, delay) {
    var _a = react_1.useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    react_1.useEffect(function () {
        var timer = setTimeout(function () { return setDebouncedValue(value); }, delay);
        return function () { return clearTimeout(timer); };
    }, [value, delay]);
    return debouncedValue;
}
exports.useDebounce = useDebounce;
