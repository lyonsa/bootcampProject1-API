class QueueObserver {
	constructor(db) {
		this.queue = db.ref('queue')
		this.games = db.ref('games')
		this.users = db.ref('users')
		this.state = {
			players: [],
			creatingGame: false,
			initalized: false,
		}
		// register methods
		this.init()
	}

	async init() {
		await this.getInitialState()
		await this.registerListeners()
	}

	async getInitialState() {
		const queue = await this.queue.once('value')
		const players = Object.keys(queue)
		this.state.players = players
	}

	registerListeners() {
		this.queue.on('child_added', snap => this.onPlayerAdded(snap))
		this.queue.on('child_removed', snap => this.onChildAdded(snap))
		this.queue.on('value', snap => {
			console.log('num children -> ', snap.numChildren())
			if (snap.numChildren() >= 2 && !this.state.creatingGame) this.createNewGame(
				this.state.players[0],
				this.state.players[1],
			)
		})
	}

	onPlayerAdded(player) {
		try {
			const uid = player.getKey()
			this.state.players.push(uid)
		} catch (err) {
			console.error(`Error adding ${uid} to local queue: ${err.message}`)
		}
	}

	onPlayerRemoved(player) {
		try {
			const uid = player.getKey()
			const index = this.state.players.indexOf(key)
			this.state.players = this.state.players.shift()
		} catch (err) {
			console.error(`Error removing ${uid} from local queue: ${err.message}`)
		}
	}

	async removeFromQueue(uid) {
		try {
			await this.queue.child(uid).remove()
		} catch (err) {
			console.error(`Error removing ${uid} from remote queue: ${err.message}`)
		}
	}

	async createNewGame(uid1, uid2) {
		try {
			this.state.creatingGame = true
			// get relevant user data
			const user1Snap = await this.users.child(uid1).once('value')
			const user2Snap = await this.users.child(uid2).once('value')
			const user1 = user1Snap.val()
			const user2 = user2Snap.val()
			// check player availability
			if (!user1.online || user1.currentGame) {
				return await this.removeFromQueue(uid1)
			}
			if (!user2.online || user2.currentGame) {
				return await this.removeFromQueue(uid2)
			}
			// create new game
			this.games.push({ uid1, uid2 })
			// remove both users from queue
			[uid1, uid2].forEach(uid => this.removeFromQueue(uid))
			this.state.creatingGame = false
		} catch (err) {
			this.state.creatingGame = false
			console.error(`Error creating game: ${err.message}`)
		}
	}
}

export default QueueObserver
