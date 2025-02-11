"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
var headers_1 = require("next/headers"); // added
var context_1 = require("@/context");
exports.metadata = {
    title: "AppKit Example App",
    description: "Powered by WalletConnect"
};
function RootLayout(_a) {
    var children = _a.children;
    var cookies = headers_1.headers().get('cookie');
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", null,
            React.createElement(context_1["default"], { cookies: cookies }, children))));
}
exports["default"] = RootLayout;
