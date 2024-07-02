"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSupportedTokens = exports.getQuotes = void 0;

var _xyapis = require("../constanst/xyapis.js");

var _service = require("../services/service.js");

var getQuotes = function getQuotes(req, res) {
  var params, data;
  return regeneratorRuntime.async(function getQuotes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          params = req.query;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_service.ApiService.GetApi(_xyapis.uri, _xyapis.endpoints.getQuotes, params));

        case 4:
          data = _context.sent;
          res.status(200).json(data.data);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            error: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getQuotes = getQuotes;

var getSupportedTokens = function getSupportedTokens(req, res) {
  var data;
  return regeneratorRuntime.async(function getSupportedTokens$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_service.ApiService.GetApi(_xyapis.uri, _xyapis.endpoints.getSupportedTokens, ""));

        case 3:
          data = _context2.sent;
          console.log(data.data);
          res.status(200).json(data.data);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getSupportedTokens = getSupportedTokens;