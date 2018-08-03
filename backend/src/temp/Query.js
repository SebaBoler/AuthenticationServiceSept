const Query = {
    // user: async (_, args, context, info) => {
    //    return await context.prisma.query.user(
    //        { 
    //            where: 
    //            { 
    //                id: args.id,
    //                email: args.email 
    //             } 
    //         }, 
    //         info
    //     );
    // },
    users: (parent, args, context, info) => {
        return context.prisma.query.users({ where: {
            id: args.id,
            email: args.id
        }}, info);
    },
}

module.export = Query;