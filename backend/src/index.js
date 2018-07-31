const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");
const chalk = require("chalk");
const dotenv = require("dotenv").config();
// dotenv.config();
// const resolvers = require('./resolvers');

const resolvers = {
  Query: {
    user: async (_, args, context, info) => {
      return await context.prisma.query.user(
        {
          where: {
            id: args.id,
            email: args.email
          }
        },
        info
      );
    },
    users: async (_, args, context, info) => {
      return await context.prisma.query.users(
        {
          where: {
           email: args.email
          }
        },
        info
      );
    },
  },
  Mutation: {
    signup: (_, args, context, info) => {
      return context.prisma.mutation.createUser(
        {
          data: {
            name: args.name,
            email: args.email,
            password: args.password
          }
        },
        info
      );
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: process.env.PRISMA_ENDPOINT,
      // secret: process.env.APP_SECRET
      debug: false,
    })
  })
});
server.start(() => 
  console.log(`GraphQL server is running on ${chalk.green(process.env.YOGA_ENDPOINT)}`),
);
