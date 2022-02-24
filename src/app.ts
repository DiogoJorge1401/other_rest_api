import express, { Request, Response } from 'express'
import { routes } from './routes'
import cors from 'cors'
import config from 'config'
import cookieParser from 'cookie-parser'
import responseTime from 'response-time'
import { restResponseTimeHistogram } from './utils/Metrics'

const app = express()

app.use(cors({ origin: config.get('origin'), credentials: true }))

app.use(cookieParser())

app.use(express.json())

app.get('/healthcheck', (req: Request, res: Response) => {
  res.sendStatus(200)
})

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      )
    }
  })
)

app.use('/api', routes)

export { app }
