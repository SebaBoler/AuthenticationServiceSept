const { getUserId } = require('../utils')

const Query = {
  users: async (parent, args, ctx, info) => {
    const id = getUserId(ctx)
    return await ctx.db.query.users({}, info)
  }, 

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}

module.exports = { Query }
