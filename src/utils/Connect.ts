import mongoose from 'mongoose'
import config from 'config'
import { log } from './Logger'

export const connect = async () => {
  const dbUri =
    process.env.NODE_ENV === 'production'
      ? process.env.DB_CONNECTION
      : config.get<string>('dbUri')
  console.log(dbUri)
  try {
    const connect = await mongoose.connect(dbUri)
    log.info('DB Connected')
    return connect
  } catch (err) {
    log.error('Could not connect to db\n')
    process.exit(1)
  }
}
