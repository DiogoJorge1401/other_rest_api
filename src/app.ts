import config from 'config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import responseTime from 'response-time'
import { routes } from './routes'
import { restResponseTimeHistogram } from './utils/Metrics'

const app = express()

app.use(cors({ origin: config.get('origin'), credentials: true }))

app.use(cookieParser())

app.use(express.json())

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

app.use(routes)

export { app }
