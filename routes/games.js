import Router from 'express-promise-router'
import axios from 'axios'
import boom, { badRequest, badGateway } from 'boom'

import { makeQuery, fetchQuestions } from '../utils'
import { firebaseGames, firebasePlayers } from '../firebase'

const router = Router()

/**
 * Start game route
 * POST `/game/start-game`
 * (public)
 */
router.get('/', async (req, res, next) => {
	try {
		// get parameters
		const { open } = req.query
		console.log(req.params)
		// get all|open games
		const gamesRef = !open ? firebaseGames :
			firebaseGames.orderByChild('uid2').equalTo(null)
		const snap = await gamesRef.once('value')
		const games = await snap.val()
		// format to keys
		const gids = games ? Object.keys(games) : []
		res.status(200).json({ games: gids })
	} catch (err) {
		console.error(err)
		next(badGateway('Could not fetch games'))
	}
})

router.get('/:gid', async (req, res, next) => {
	// get parameters
	const { gid } = req.params
	const { withPlayers } = req.query
	console.log('withplayers -> ', withPlayers)
	// get game
	const gameRef = firebaseGames.child(gid)
	const snap = await gameRef.once('value')
	const game = snap.val()
	if (withPlayers) {
		const { uid1, uid2 } = game
		const player1 = await getPlayer(uid1)
		const player2 = await getPlayer(uid2)
		return res.status(200).json({
			game,
			player1,
			player2
		})
	}
})

const getPlayer = async uid => {
	const ref = firebasePlayers.child(uid)
	const snap = await ref.once('value')
	return snap.val()
}

router.post('/init-game', async (req, res, next) => {
	// get parameters
	const { category, gid, difficulty } = req.body
	// validate parameters
	if (!gid) {
		next(badRequest('game id is required'))
	} else if (!category) {
		next(badRequest('category is required'))
	}
	// make query url
	const query = makeQuery(category, difficulty)
	// fetch questons
	const questions = await fetchQuestions(query)
	// inject question to fb game
	firebaseGames.child(gid).update({ questions })
	res.status(201).json({
		message: `successfully added questions to game: ${gid}`,
		success: true,
	})
})

router.get('/get-questions', async (req, res, next) => {
	// get parameters
	const query = makeQuery('computer science')
	const questions = await fetchQuestions(query)
	res.status(201).json({
		questions,
		success: true,
	})
})

export default router
