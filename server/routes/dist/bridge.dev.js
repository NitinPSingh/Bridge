"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bridge = require("../controllers/bridge.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/tokens', _bridge.getSupportedTokens);
router.get('/quotes', _bridge.getQuotes);
router.get('/params');
var _default = router;
exports["default"] = _default;