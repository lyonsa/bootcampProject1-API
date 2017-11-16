import Router from 'express-promise-router'
import axios from 'axios'
import boom, { badRequest, badGateway } from 'boom'

import { makeQuery, fetchQuestions } from '../utils'
import { firebaseGames } from '../firebase'

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

export default router
