import config from 'config'
import { app } from './app'
import { connect } from './utils/Connect'
import { log } from './utils/Logger'
import { StartMetricsServer } from './utils/Metrics'

const port = config.get('port')
connect()

app.listen(port, () => {
  log.info(`App is running at http://localhost:${port}`)
  StartMetricsServer()
})
