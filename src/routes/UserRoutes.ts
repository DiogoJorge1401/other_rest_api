import { Router } from 'express'
import {
  CreateUserHandler,
  GetCurrentUser,
} from '../controllers/User/user.controller'
import { deserializeUser } from '../middlewares'
import { validate } from '../middlewares/validateResource'
import { createUserSchema } from '../schema/user.schema'

const userRoutes = Router()

/**
 * @openapi
 * '/api/user':
 *  post:
 *    tags:
 *      - User
 *    summary: Register a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CreateUserResponse'
 *
 *        409:
 *          description: Conflict
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    default: User alredy exist
 *        400:
 *          description: Bad Request
 */
userRoutes.post('/user', validate(createUserSchema), CreateUserHandler)

userRoutes.get('/user/me', deserializeUser, GetCurrentUser)

export { userRoutes }
