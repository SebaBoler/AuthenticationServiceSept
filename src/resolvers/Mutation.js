const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createToken, getUserId } = require('../utils')

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

    // console.log(user.id);
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }


    return {
    //  token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      token: createToken(user.id),
      user
    }
  },

  async refreshToken(parent, { token }, ctx, info) {
    const userId = getUserId(token); 
    return  createToken(userId);
  },
}

module.exports = { Mutation }
