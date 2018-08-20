const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createToken, getUserId } = require('../utils')

function createToken1(userId) {
  jwt.sign({ userId, expiresIn: 60}, process.env.APP_SECRET)
}

const Mutation = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 12)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password },
    })

    return {
      // token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      token: createToken(user.id),
      user,
    }
  },

  async login(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
    //  token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      token: createToken1(user.id),
      user,
    }
  },

  async refreshToken(parent, { token }, ctx, info) {
    const userId = getUserId(ctx, token); 
    return  createToken(userId);
  },
}

module.exports = { Mutation }
