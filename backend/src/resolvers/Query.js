const Query = {
    users: async (parent, args, context, info) => {
        return await context.prisma.query.users({}, info)
    }
}

module.exports = Query;
