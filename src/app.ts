import express, { Request, Response } from 'express'
import { routes } from './routes'

const app = express()

app.use(express.json())

app.get('/healthcheck', (req: Request, res: Response) => {
  res.sendStatus(200)
})

app.use('/api', routes)

export { app }
