import config from 'config'
import { get } from 'lodash'
import { FilterQuery, UpdateQuery } from 'mongoose'
import { SessionModel } from '../../models/Session/session.model'
import { SessionDocument } from '../../models/Session/SessionModelInterfaces'
import { GenerateTokenToCookie } from '../../utils/Cookie'
import { verifyJwt } from '../../utils/Jwt.utils'
import { FindUser, ValidatePassword } from '../User/user.service'
import {
  CreateSessionProps,
  CreateUserSessionProps
} from './SessionServiceInterfaces'

export const CreateSessionIfUserExist = async (
  userData: CreateUserSessionProps,
  userAgent: string
) => {
  try {
    const user = await ValidatePassword(userData)

    if (!user) throw { message: 'Invalid email or password', status: 401 }

    const session = await CreateSession({
      userAgent: userAgent || '',
      userId: user._id,
    })

    return { user, session }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const CreateSession = async ({
  userId,
  userAgent,
}: CreateSessionProps) => {
  try {
    return await SessionModel.create({ user: userId, userAgent })
  } catch (err) {
    throw new Error(err)
  }
}
export const FindSessions = async (query: FilterQuery<SessionDocument>) =>
  await SessionModel.find(query).lean()

export const InvalidSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => await SessionModel.updateOne(query, update)

export const GetValidSessionById = async (sessionId: string) => {
  const session = await SessionModel.findById(sessionId)
  if (!session || !session.valid) throw new Error('Not found session')
  return session
}

export const ReIssueAccessToken = async (refreshToken: string) => {
  const { decoded } = verifyJwt(refreshToken)

  if (!decoded || !get(decoded, 'session')) return false

  const session = await SessionModel.findById(get(decoded, 'session'))

  if (!session || !session.valid) return false

  const user = await FindUser({ _id: session.user })

  if (!user) return false

  const accessToken = GenerateTokenToCookie({
    user,
    session: session._id,
    expiresIn: config.get('accessTokenTtl'),
  })

  return accessToken
}
