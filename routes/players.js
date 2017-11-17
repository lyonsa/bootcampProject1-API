import Router from 'express-promise-router'
import { badGateway } from 'boom' 

import { firebasePlayers, firebaseQueue, firebaseGames } from '../firebase'

const router = Router()

router.get('/', async (req, res, next) => {
	// get parametes
	const { online } = req.query
	// get players
	const playersRef = !online ? firebasePlayers :
		firebasePlayers.orderByChild('online').equalTo(true)
	const snap = await playersRef.once('value')
	const players = snap.val()
	res.status(200).json(players)
})

router.get('/:uid', async (req, res, next) => {
	// get params
	const { uid } = req.params
	// get player
	const ref = firebasePlayers.child(uid)
	const snap = await ref.once('value')
	const player = snap.val()
	res.status(200).json(player)
})

router.get('/:uid/games', async (req, res, next) => {
	// get params
	const { uid } = req.params
	// get games
	const whereUid1Ref = firebaseGames.orderByChild('uid1').equalTo(uid)
	const whereUid2Ref = firebaseGames.orderByChild('uid2').equalTo(uid)
	// resolve and merge
	let games = {}
	await [whereUid1Ref, whereUid2Ref].forEach(async ref => {
		const snap = await ref.once('value')
		const $games = await snap.val()
		games = { ...games, ...$games }
	})
	res.status(200).json(games)
})

export default router
