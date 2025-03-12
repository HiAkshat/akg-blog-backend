// GraphQL Modules
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";
// Type Defs
import { userTypeDefs } from "./typedefs/user.typedef";
// Resolvers
import UserResolvers from "./resolvers/user.resolvers";

// Resolvers
const userResolver = new UserResolvers()

const typeDefs = mergeTypeDefs([userTypeDefs]);
const resolvers = mergeResolvers([userResolver.getResolvers()]);

export const graphqlSchema = makeExecutableSchema({ typeDefs, resolvers });
