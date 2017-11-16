import Router from 'express-promise-router'
import { badGateway } from 'boom' 

import { firebasePlayers, firebaseQueue } from '../firebase'

const router = Router()

router.get('/players', async (req, res, next) => {
	// get parametes
	const { online } = req.query
	// get players
	const playersRef = !online ? firebasePlayers :
		firebasePlayers.orderByChild('online').equalTo(true)
	const snap = await playersRef.once('value')
	const players = snap.val()
	res.status(200).json({ players })
})

router.get('/queue', async (req, res, next) => {
		const snap = await firebaseQueue.once('value')
		const queue = snap.val()
		res.status(200).json({ queue })
})

export default router
