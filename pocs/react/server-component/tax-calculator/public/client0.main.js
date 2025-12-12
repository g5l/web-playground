"use strict";
(self["webpackChunktax_calculator"] = self["webpackChunktax_calculator"] || []).push([["client0"],{

/***/ "./src/Counter.js":
/*!************************!*\
  !*** ./src/Counter.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Counter: () => (/* binding */ Counter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";



function Counter() {
  const [count, setCount] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const increment = () => {
    setCount(count + 1);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
    onClick: increment,
    children: count
  });
}

/***/ })

}]);
//# sourceMappingURL=client0.main.js.map