import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'

import routes from './routes'

const PROD = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000

// initalize express app
const app = express()

// mount middleware
app
	.use(helmet())
	.use(hpp())
	.use(compression())
	.use(morgan(PROD ? 'combined' : 'dev'))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(cors())

// disable some headers
app
	.disable('x-powered-by')
	.disable('etag')

// mount routes
app
	.use('/game', routes.gameRoute)

// listen for traffic
app.listen(PORT)

process.on('uncaughtException', err => console.error(err))
