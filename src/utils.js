const jwt = require('jsonwebtoken')

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new AuthError()
}

function createToken(userId) {
  jwt.sign({ userId, expiresIn: "1h" }, process.env.APP_SECRET)
}
class AuthError extends Error {
  constructor() {
    super('Srry hacker, you are not invited here')
  }
}

module.exports = {
  getUserId,
  createToken,
  AuthError
}