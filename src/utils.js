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

const createToken = (userId) => {
  const token = jwt.sign({ userId, expiresIn: "15m" }, process.env.APP_SECRET);
  return token
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