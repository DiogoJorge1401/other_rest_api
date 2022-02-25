import { Request, Response, Router } from 'express'
import { productRoutes, sessionRoutes, userRoutes } from './routes/index'

const routes = Router()

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
routes.get('/healthcheck', (req: Request, res: Response) => {
  res.sendStatus(200)
})

routes.use('/api', userRoutes)
routes.use('/api', sessionRoutes)
routes.use('/api', productRoutes)

export { routes }
