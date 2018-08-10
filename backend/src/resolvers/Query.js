const { getUserId } = require('../utils');

const Query = {
    // me: async (parent, args, context, info) => {
    //     if (!context.request.id) {
    //         return null;
    //     }
    //     return await context.prisma.query.user(
    //         {
    //             where: { id: context.id },
    //         },
    //         info,
    //     );
    // },
    users: async (parent, args, context, info) => {
        return await context.prisma.query.users({}, info)
    },
    me(parent, args, context, info) {
        const id = getUserId(context)
        return context.prisma.query.user({ where: { id } }, info)
    },
}

module.exports = Query;