// GraphQL Modules
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';
// Type Defs
import { userTypeDefs } from './typedefs/user.typedef';
// Resolvers
import UserResolvers from './resolvers/user.resolvers';
import { applyMiddleware } from 'graphql-middleware';
import { shield } from 'graphql-shield';

// Resolvers
const userResolver = new UserResolvers();

const typeDefs = mergeTypeDefs([userTypeDefs]);
const resolvers = mergeResolvers([userResolver.getResolvers()]);
const permissions = shield({
  Query: {
    ...(userResolver.getPermissions().Query)
  },
  Mutation: {
    ...(userResolver.getPermissions().Mutation)
  }
})

const graphqlSchema = makeExecutableSchema({ typeDefs, resolvers });
export const protectedGraphqlSchema = applyMiddleware(graphqlSchema, permissions)
