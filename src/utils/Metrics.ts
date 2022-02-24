import express from 'express'
import client from 'prom-client'
import { log } from './Logger'

const app = express()

export const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
})

export const databaseResponseTimeHistrogram = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response time in seconds',
  labelNames: ['operation', 'success'],
})

export const StartMetricsServer = () => {
  const collectDefaultMetrics = client.collectDefaultMetrics

  collectDefaultMetrics()

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType)

    return res.send(await client.register.metrics())
  })

  app.listen(9000, () =>
    log.info('Metrics Server started at http://localhost:9000')
  )
}
