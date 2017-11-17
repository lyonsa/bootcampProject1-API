import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'

import * as routes from '../routes'
import * as middleware from '../middleware'

const PROD = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 8080

// initalize express app
const app = express()

// mount middleware
app
	.use(helmet())
	.use(hpp())
	.use(compression())
	.use(morgan(PROD ? 'combined' : 'dev'))
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(cors())

// disable some headers
app
	.disable('x-powered-by')
	.disable('etag')

// mount routes
app
	.use(routes.rootRoute)
	.use('/games', routes.gameRoute)
	.use('/players', routes.playerRoute)
	.use(middleware.notFound)
	.use(middleware.errorHandler)

// listen for traffic
app.listen(PORT)
