'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _games = require('./games');

Object.defineProperty(exports, 'gameRoute', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_games).default;
  }
});

var _root = require('./root');

Object.defineProperty(exports, 'rootRoute', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_root).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map
