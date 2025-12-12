"use strict";
(self["webpackChunktax_calculator"] = self["webpackChunktax_calculator"] || []).push([["client1"],{

/***/ "./src/components/TaxForm.client.jsx":
/*!*******************************************!*\
  !*** ./src/components/TaxForm.client.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TaxForm)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
'use client';



function TaxForm({
  products,
  states,
  years
}) {
  const [formData, setFormData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    productId: products[0]?.id || '',
    stateCode: states[0]?.code || '',
    year: years[years.length - 1] || 2025,
    quantity: 1
  });
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'year' ? parseInt(value, 10) : value
    }));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("form", {
    method: "GET",
    action: "/",
    className: "tax-form",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "tax-form__group",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
        htmlFor: "productId",
        className: "tax-form__label",
        children: "Product:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("select", {
        id: "productId",
        name: "productId",
        value: formData.productId,
        onChange: handleChange,
        className: "tax-form__select",
        children: products.map(product => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("option", {
          value: product.id,
          children: [product.name, " ($", product.basePrice, ")"]
        }, product.id))
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "tax-form__group",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
        htmlFor: "stateCode",
        className: "tax-form__label",
        children: "State:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("select", {
        id: "stateCode",
        name: "stateCode",
        value: formData.stateCode,
        onChange: handleChange,
        className: "tax-form__select",
        children: states.map(state => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("option", {
          value: state.code,
          children: [state.name, " (", state.code, ")"]
        }, state.code))
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "tax-form__group",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
        htmlFor: "year",
        className: "tax-form__label",
        children: "Tax Year:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("select", {
        id: "year",
        name: "year",
        value: formData.year,
        onChange: handleChange,
        className: "tax-form__select",
        children: years.map(year => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("option", {
          value: year,
          children: year
        }, year))
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "tax-form__group",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
        htmlFor: "quantity",
        className: "tax-form__label",
        children: "Quantity:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
        type: "number",
        id: "quantity",
        name: "quantity",
        min: "1",
        value: formData.quantity,
        onChange: handleChange,
        className: "tax-form__input"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      type: "submit",
      className: "tax-form__button",
      children: "Calculate Tax"
    })]
  });
}

/***/ })

}]);
//# sourceMappingURL=client1.main.js.map