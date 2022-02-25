export default {
  port: 3000,
  origin: 'http://localhost:3001',
  dbUri: 'mongodb://localhost:27017/rest-api',
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1d',
  accessTokenPrivateKey: ``,
  accessTokenPublicKey: ``,
  googleClientId:
    '55287493619-3jf1esnabb14ph43t6cmck0fo65crpt0.apps.googleusercontent.com',
  googleClientSecret: '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',
  googleOauthRedirectUri: 'http://localhost:3000/api/session/oauth/google',
}
