require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("boom");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(5);

var _express2 = _interopRequireDefault(_express);

var _morgan = __webpack_require__(6);

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = __webpack_require__(7);

var _helmet2 = _interopRequireDefault(_helmet);

var _hpp = __webpack_require__(8);

var _hpp2 = _interopRequireDefault(_hpp);

var _cors = __webpack_require__(9);

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = __webpack_require__(10);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(11);

var _compression2 = _interopRequireDefault(_compression);

var _routes = __webpack_require__(12);

var routes = _interopRequireWildcard(_routes);

var _middleware = __webpack_require__(19);

var middleware = _interopRequireWildcard(_middleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROD = "development" === 'production';
var PORT = process.env.PORT || 3000;

// initalize express app
var app = (0, _express2.default)();

// mount middleware
app.use((0, _helmet2.default)()).use((0, _hpp2.default)()).use((0, _compression2.default)()).use((0, _morgan2.default)(PROD ? 'combined' : 'dev')).use(_bodyParser2.default.json()).use((0, _cors2.default)());

// disable some headers
app.disable('x-powered-by').disable('etag');

// mount routes
app.use('/game', routes.gameRoute).use(middleware.notFound).use(middleware.errorHandler);

// listen for traffic
app.listen(PORT);

process.on('uncaughtException', function (err) {
	return console.error(err);
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("hpp");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _game = __webpack_require__(13);

Object.defineProperty(exports, 'gameRoute', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_game).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _expressPromiseRouter = __webpack_require__(15);

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _boom = __webpack_require__(0);

var _boom2 = _interopRequireDefault(_boom);

var _utils = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = (0, _expressPromiseRouter2.default)();

/**
 * Start game route
 * POST `/game/start-game`
 * (public)
 */
router.post('/start-game', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
		var _req$body, uid1, uid2, category, difficulty, query, questions;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						// get parameters
						_req$body = req.body, uid1 = _req$body.uid1, uid2 = _req$body.uid2, category = _req$body.category, difficulty = _req$body.difficulty;
						// validate parameters

						if (!uid1) {
							next((0, _boom.badRequest)('uid1 is required'));
						} else if (!uid2) {
							next((0, _boom.badRequest)('uid2 is required'));
						} else if (!category) {
							next((0, _boom.badRequest)('category is required'));
						}
						// make query url
						query = (0, _utils.makeQuery)(category, difficulty);
						// fetch questons

						_context.next = 5;
						return (0, _utils.fetchQuestions)(query);

					case 5:
						questions = _context.sent;

						res.status(201).json({
							questions: questions,
							success: true
						});

					case 7:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}());

exports.default = router;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express-promise-router");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _makeQuery = __webpack_require__(17);

Object.defineProperty(exports, 'makeQuery', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_makeQuery).default;
  }
});

var _fetchQuestions = __webpack_require__(18);

Object.defineProperty(exports, 'fetchQuestions', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fetchQuestions).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _boom = __webpack_require__(0);

var BASE_URL = 'https://opentdb.com/api.php?amount=5';

// @enum 
var difficulties = ['easy', 'medium', 'hard'];

// map category to number for trivia api
var categoryMapper = function categoryMapper(category) {
	switch (category) {
		case 'general':
			return 9;
		case 'books':
			return 10;
		case 'film':
			return 11;
		case 'music':
			return 12;
		case 'television':
			return 14;
		case 'video games':
			return 15;
		case 'board games':
			return 16;
		case 'computer science':
			return 18;
		case 'mathematics':
			return 19;
		case 'mythology':
			return 20;
		case 'sports':
			return 21;
		case 'geography':
			return 22;
		default:
			throw (0, _boom.badRequest)('invalid category');
	}
};

exports.default = function () {
	var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'general';
	var difficulty = arguments[1];

	// map category parameter
	var cat = categoryMapper(category);
	// form url
	var url = BASE_URL + '&category=' + cat;
	// optionally add difficulty param
	var diff = difficulties[difficulties.indexOf(difficulty)];
	if (diff) url += '&difficulty=' + diff;
	// return formatted url
	return url;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _boom = __webpack_require__(0);

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryUrl) {
		var _ref2, data;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _axios2.default.get(queryUrl);

					case 3:
						_ref2 = _context.sent;
						data = _ref2.data;

						if (!(data.response_code !== 0)) {
							_context.next = 7;
							break;
						}

						throw new Error();

					case 7:
						return _context.abrupt('return', data.results);

					case 10:
						_context.prev = 10;
						_context.t0 = _context['catch'](0);
						throw (0, _boom.badGateway)('error fetching questions');

					case 13:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 10]]);
	}));

	return function (_x) {
		return _ref.apply(this, arguments);
	};
}();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errorHandler = __webpack_require__(20);

Object.defineProperty(exports, 'errorHandler', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_errorHandler).default;
  }
});

var _notFound = __webpack_require__(21);

Object.defineProperty(exports, 'notFound', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_notFound).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boom = __webpack_require__(0);

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function ($err, req, res, next) {
  // get boom error
  // convert to error 500 if not boom error
  var err = $err.isBoom ? $err : (0, _boom.badImplementation)('Something broke ):');
  var _err$output$payload = err.output.payload,
      message = _err$output$payload.message,
      statusCode = _err$output$payload.statusCode,
      error = _err$output$payload.error;
  // log error

  console.error(error + ': ' + message);
  console.error($err.stack);
  res.status(statusCode).json({
    error: error,
    message: message
  });
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boom = __webpack_require__(0);

exports.default = function (req, res, next) {
  next((0, _boom.notFound)('The endpoint you requested was not found.'));
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map