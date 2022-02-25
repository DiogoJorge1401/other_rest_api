import jwt from 'jsonwebtoken'
import config from 'config'

const accessTokenPrivateKey = Buffer.from(
  config.get<string>('accessTokenPrivateKey') ||
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
  'base64'
).toString('ascii')
const accessTokenPublicKey = Buffer.from(
  config.get<string>('accessTokenPublicKey') ||
    process.env.ACCESS_TOKEN_PUBLIC_KEY,
  'base64'
).toString('ascii')

export const signJwt = (object: Object, options?: jwt.SignOptions) => {
  return jwt.sign(object, accessTokenPrivateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}
export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, accessTokenPublicKey)
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (error) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    }
  }
}
