'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gameObserver = require('./game-observer');

Object.defineProperty(exports, 'GameObserver', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_gameObserver).default;
  }
});

var _queueObserver = require('./queue-observer');

Object.defineProperty(exports, 'QueueObserver', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_queueObserver).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map
