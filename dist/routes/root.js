'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _boom = require('boom');

var _firebase = require('../firebase');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = (0, _expressPromiseRouter2.default)();

router.get('/leaderboard', (() => {
	var _ref = _asyncToGenerator(function* (req, res, next) {
		const ref = _firebase.firebasePlayers;
		const snap = yield ref.orderByChild('lifetimeScore').limitToFirst(10).once('value');
		const leaderboard = snap.val();
		res.status(200).json(leaderboard);
	});

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
})());

router.get('/queue', (() => {
	var _ref2 = _asyncToGenerator(function* (req, res, next) {
		const snap = yield _firebase.firebaseQueue.once('value');
		const queue = snap.val();
		res.status(200).json({ queue });
	});

	return function (_x4, _x5, _x6) {
		return _ref2.apply(this, arguments);
	};
})());

exports.default = router;
//# sourceMappingURL=root.js.map
