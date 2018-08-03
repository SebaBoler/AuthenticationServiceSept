const bcrypt = require('bcryptjs');

const mutations = {
  async signup(parent, args, context, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 12);
    const user = await context.prisma.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      info
    );
    return user;
  },
}

module.exports = mutations;