'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _boom = require('boom');

var _firebase = require('../firebase');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = (0, _expressPromiseRouter2.default)();

router.get('/', (() => {
	var _ref = _asyncToGenerator(function* (req, res, next) {
		// get parametes
		const online = req.query.online;
		// get players

		const playersRef = !online ? _firebase.firebasePlayers : _firebase.firebasePlayers.orderByChild('online').equalTo(true);
		const snap = yield playersRef.once('value');
		const players = snap.val();
		res.status(200).json(players);
	});

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
})());

router.get('/:uid', (() => {
	var _ref2 = _asyncToGenerator(function* (req, res, next) {
		// get params
		const uid = req.params.uid;
		// get player

		const ref = _firebase.firebasePlayers.child(uid);
		const snap = yield ref.once('value');
		const player = snap.val();
		res.status(200).json(player);
	});

	return function (_x4, _x5, _x6) {
		return _ref2.apply(this, arguments);
	};
})());

router.get('/:uid/games', (() => {
	var _ref3 = _asyncToGenerator(function* (req, res, next) {
		// get params
		const uid = req.params.uid;
		// get games

		const whereUid1Ref = _firebase.firebaseGames.orderByChild('uid1').equalTo(uid);
		const whereUid2Ref = _firebase.firebaseGames.orderByChild('uid2').equalTo(uid);
		// resolve and merge
		let games = {};
		yield [whereUid1Ref, whereUid2Ref].forEach((() => {
			var _ref4 = _asyncToGenerator(function* (ref) {
				const snap = yield ref.once('value');
				const $games = yield snap.val();
				games = _extends({}, games, $games);
			});

			return function (_x10) {
				return _ref4.apply(this, arguments);
			};
		})());
		res.status(200).json(games);
	});

	return function (_x7, _x8, _x9) {
		return _ref3.apply(this, arguments);
	};
})());

exports.default = router;
//# sourceMappingURL=players.js.map
