const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../utils');

const mutations = {
//   async signup(parent, args, context, info) {
//     args.email = args.email.toLowerCase();
//     const password = await bcrypt.hash(args.password, 12);
//     const user = await context.prisma.mutation.createUser(
//       {
//         data: {
//           ...args,
//           password,
//         },
//       },
//       info
//     );
//     return user;
//   },
    // async signup(parent, args, context, info) {
    //     args.email = args.email.toLowerCase();
    //     const password = await bcrypt.hash(args.password, 12);
    //     const user = await context.prisma.mutation.createUser(
    //     {
    //         data: {
    //           ...args,
    //           password,
    //         },
    //     },
    //     info
    //     );
    //     return user;
    // },
    async signup(parent, args, context, info) {
        args.email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password, 12);   
        // const userId = getUserId(context);
        // const requestingUserisAdmin = await context.prisma.exist.User({
        //     id: userId,
        //     role: 'ADMIN',
        // });

        const user = await context.prisma.mutation.createUser({
            data: { ...args, password },
        })    

        
        // if (requestingUserisAdmin) {
            return {
                token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
                user,// do poprawienia aby nie zwracal password do tokena
            }
        // }
        // throw new Error(
        //     'Invalid permission, you must be an admin',
        // )
    },
    async login(parent, { email, password }, context, info) {
        const user = await context.prisma.query.user({ where: { email } })
        if (!user) {
          throw new Error(`No such user found for email: ${email}`)
        }
    
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
          throw new Error('Invalid password')
        }
    
        return {
          token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
          user,
        }
    },
}

module.exports = mutations;