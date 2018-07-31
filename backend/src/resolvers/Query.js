export const Query = {
    user: (_, args, context, info) => {
       return context.prisma.query.user(
           { 
               where: 
               { 
                   id: args.id,
                   email: args.email 
                } 
            }, 
            info
        );
    },
}