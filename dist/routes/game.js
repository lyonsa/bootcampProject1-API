'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = (0, _expressPromiseRouter2.default)();

/**
 * Start game route
 * POST `/game/start-game`
 * (public)
 */
router.post('/start-game', (() => {
	var _ref = _asyncToGenerator(function* (req, res, next) {
		// get parameters
		var _req$body = req.body;
		const uid1 = _req$body.uid1,
		      uid2 = _req$body.uid2,
		      category = _req$body.category,
		      difficulty = _req$body.difficulty;
		// validate parameters

		if (!uid1) {
			next((0, _boom.badRequest)('uid1 is required'));
		} else if (!uid2) {
			next((0, _boom.badRequest)('uid2 is required'));
		} else if (!category) {
			next((0, _boom.badRequest)('category is required'));
		}
		// make query url
		const query = (0, _utils.makeQuery)(category, difficulty);
		// fetch questons
		const questions = yield (0, _utils.fetchQuestions)(query);
		res.status(201).json({
			questions,
			success: true
		});
	});

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
})());

exports.default = router;
//# sourceMappingURL=game.js.map
