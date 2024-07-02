"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _bridge = _interopRequireDefault(require("./routes/bridge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initializeExpress = function initializeExpress() {
  var app = (0, _express["default"])();
  var port = 3001;
  app.use(_bodyParser["default"].json({
    limit: '30mb',
    extended: true
  }));
  app.use(_bodyParser["default"].urlencoded({
    limit: '30mb',
    extended: true
  }));
  app.use((0, _cors["default"])());
  app.use('/', _bridge["default"]);
  app.listen(port, function () {
    console.log('Express server started on port %s', port);
  });
};

var initializeApp = function initializeApp() {
  return regeneratorRuntime.async(function initializeApp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          initializeExpress();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

initializeApp();