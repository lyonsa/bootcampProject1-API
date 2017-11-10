import Router from 'express-promise-router'
import axios from 'axios'
import boom from 'boom'

import { makeQuery, fetchQuestions } from '../utils'

const router = Router()

/**
 * Start game route
 * POST `/game/start-game`
 * (public)
 */
router.post('/start-game', async (req, res, next) => {
	// get parameters
	const { uid1, uid2, category, difficulty } = req.body
	// validate parameters
	if (!uid1) {
		next(new boom.badRequest('uid1 is required'))
	} else if (!uid2) {
		next(new boom.badRequest('uid2 is required'))
	} else if (!category) {
		next(new boom.badRequest('category is required'))
	}
	// make query url
	const query = makeQuery(category, difficulty)
	// fetch questons
	const questions = await fetchQuestions(query)
	res.status(201).json({
		questions,
		success: true,
	})
})

export default router
