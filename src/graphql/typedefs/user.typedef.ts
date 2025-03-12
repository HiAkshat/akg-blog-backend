import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    users: [User]
    user(email: String!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): String
  }
`;
