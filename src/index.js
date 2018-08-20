const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const chalk = require("chalk");
const resolvers = require('./resolvers')
require('dotenv').config()

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  debug: true, 
  // secret: process.env.PRISMA_SECRET, 
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({ ...req, db }),
})

server.start(() => 
  console.log(`Yoga GraphQL server is running on ${chalk.green(process.env.YOGA_ENDPOINT)}`),
);