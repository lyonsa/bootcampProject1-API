'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class QueueObserver {
	constructor(db) {
		this.queue = db.ref('queue');
		this.games = db.ref('games');
		this.users = db.ref('users');
		this.state = {
			players: [],
			creatingGame: false,
			initalized: false
			// register methods
		};this.init();
	}

	init() {
		var _this = this;

		return _asyncToGenerator(function* () {
			yield _this.getInitialState();
			yield _this.registerListeners();
		})();
	}

	getInitialState() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			const queue = yield _this2.queue.once('value');
			const players = Object.keys(queue);
			_this2.state.players = players;
		})();
	}

	registerListeners() {
		this.queue.on('child_added', snap => this.onPlayerAdded(snap));
		this.queue.on('child_removed', snap => this.onChildAdded(snap));
		this.queue.on('value', snap => {
			console.log('num children -> ', snap.numChildren());
			if (snap.numChildren() >= 2 && !this.state.creatingGame) this.createNewGame(this.state.players[0], this.state.players[1]);
		});
	}

	onPlayerAdded(player) {
		try {
			const uid = player.getKey();
			this.state.players.push(uid);
		} catch (err) {
			console.error(`Error adding ${uid} to local queue: ${err.message}`);
		}
	}

	onPlayerRemoved(player) {
		try {
			const uid = player.getKey();
			const index = this.state.players.indexOf(key);
			this.state.players = this.state.players.shift();
		} catch (err) {
			console.error(`Error removing ${uid} from local queue: ${err.message}`);
		}
	}

	removeFromQueue(uid) {
		var _this3 = this;

		return _asyncToGenerator(function* () {
			try {
				yield _this3.queue.child(uid).remove();
			} catch (err) {
				console.error(`Error removing ${uid} from remote queue: ${err.message}`);
			}
		})();
	}

	createNewGame(uid1, uid2) {
		var _this4 = this;

		return _asyncToGenerator(function* () {
			try {
				_this4.state.creatingGame = true;
				// get relevant user data
				const user1Snap = yield _this4.users.child(uid1).once('value');
				const user2Snap = yield _this4.users.child(uid2).once('value');
				const user1 = user1Snap.val();
				const user2 = user2Snap.val();
				// check player availability
				if (!user1.online || user1.currentGame) {
					return yield _this4.removeFromQueue(uid1);
				}
				if (!user2.online || user2.currentGame) {
					return yield _this4.removeFromQueue(uid2);
				}
				// create new game
				_this4.games.push({ uid1, uid2 })
				// remove both users from queue
				[(uid1, uid2)].forEach(function (uid) {
					return _this4.removeFromQueue(uid);
				});
				_this4.state.creatingGame = false;
			} catch (err) {
				_this4.state.creatingGame = false;
				console.error(`Error creating game: ${err.message}`);
			}
		})();
	}
}

exports.default = QueueObserver;
//# sourceMappingURL=queue-observer.js.map
