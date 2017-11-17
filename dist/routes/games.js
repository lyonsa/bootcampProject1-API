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

var _firebase = require('../firebase');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = (0, _expressPromiseRouter2.default)();

/**
 * Start game route
 * POST `/game/start-game`
 * (public)
 */
router.get('/', (() => {
	var _ref = _asyncToGenerator(function* (req, res, next) {
		try {
			// get parameters
			const open = req.query.open;

			console.log(req.params);
			// get all|open games
			const gamesRef = !open ? _firebase.firebaseGames : _firebase.firebaseGames.orderByChild('uid2').equalTo(null);
			const snap = yield gamesRef.once('value');
			const games = yield snap.val();
			// format to keys
			const gids = games ? Object.keys(games) : [];
			res.status(200).json({ games: gids });
		} catch (err) {
			console.error(err);
			next((0, _boom.badGateway)('Could not fetch games'));
		}
	});

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
})());

router.get('/:gid', (() => {
	var _ref2 = _asyncToGenerator(function* (req, res, next) {
		// get parameters
		const gid = req.params.gid;
		const withPlayers = req.query.withPlayers;

		console.log('withplayers -> ', withPlayers);
		// get game
		const gameRef = _firebase.firebaseGames.child(gid);
		const snap = yield gameRef.once('value');
		const game = snap.val();
		if (withPlayers) {
			const uid1 = game.uid1,
			      uid2 = game.uid2;

			const player1 = yield getPlayer(uid1);
			const player2 = yield getPlayer(uid2);
			return res.status(200).json({
				game,
				player1,
				player2
			});
		}
	});

	return function (_x4, _x5, _x6) {
		return _ref2.apply(this, arguments);
	};
})());

const getPlayer = (() => {
	var _ref3 = _asyncToGenerator(function* (uid) {
		const ref = _firebase.firebasePlayers.child(uid);
		const snap = yield ref.once('value');
		return snap.val();
	});

	return function getPlayer(_x7) {
		return _ref3.apply(this, arguments);
	};
})();

router.post('/init-game', (() => {
	var _ref4 = _asyncToGenerator(function* (req, res, next) {
		// get parameters
		var _req$body = req.body;
		const category = _req$body.category,
		      gid = _req$body.gid,
		      difficulty = _req$body.difficulty;
		// validate parameters

		if (!gid) {
			next((0, _boom.badRequest)('game id is required'));
		} else if (!category) {
			next((0, _boom.badRequest)('category is required'));
		}
		// make query url
		const query = (0, _utils.makeQuery)(category, difficulty);
		// fetch questons
		const questions = yield (0, _utils.fetchQuestions)(query);
		// inject question to fb game
		_firebase.firebaseGames.child(gid).update({ questions });
		res.status(201).json({
			message: `successfully added questions to game: ${gid}`,
			success: true
		});
	});

	return function (_x8, _x9, _x10) {
		return _ref4.apply(this, arguments);
	};
})());

router.get('/get-questions', (() => {
	var _ref5 = _asyncToGenerator(function* (req, res, next) {
		// get parameters
		const query = (0, _utils.makeQuery)('computer science');
		const questions = yield (0, _utils.fetchQuestions)(query);
		res.status(201).json({
			questions,
			success: true
		});
	});

	return function (_x11, _x12, _x13) {
		return _ref5.apply(this, arguments);
	};
})());

exports.default = router;
//# sourceMappingURL=games.js.map
