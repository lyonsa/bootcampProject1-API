import Router from 'express-promise-router'
import { badGateway } from 'boom' 

import { firebasePlayers, firebaseQueue } from '../firebase'

const router = Router()

router.get('/queue', async (req, res, next) => {
		const snap = await firebaseQueue.once('value')
		const queue = snap.val()
		res.status(200).json({ queue })
})

export default router
