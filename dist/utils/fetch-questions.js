'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
	var _ref = _asyncToGenerator(function* (queryUrl) {
		try {
			// get request
			var _ref2 = yield _axios2.default.get(queryUrl);

			const data = _ref2.data;
			// check response code

			if (data.response_code !== 0) throw new Error();
			// return results
			return data.results;
		} catch (err) {
			// rethrow as external error
			throw (0, _boom.badGateway)('error fetching questions');
		}
	});

	return function (_x) {
		return _ref.apply(this, arguments);
	};
})();
//# sourceMappingURL=fetch-questions.js.map
