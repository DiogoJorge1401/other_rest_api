import config from 'config'
import { app } from './app'
import { connect } from './utils/Connect'
import { log } from './utils/Logger'
import { StartMetricsServer } from './utils/Metrics'
import { swaggerDocs } from './utils/Swagger'

const port = config.get<number>('port')

connect()

app.listen(port, () => {
  log.info(`App is running at http://localhost:${port}`)
  StartMetricsServer()
  swaggerDocs(app, port)
})
