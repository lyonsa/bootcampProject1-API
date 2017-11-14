import './config/env'
import './config/firebase'
import './config/express'

process.on('uncaughtException', err => console.error(err))
