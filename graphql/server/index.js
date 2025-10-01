import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import typeDefs from '../schema/typeDefs.js';
import resolvers from '../schema/resolvers.js';

// Apollo expects req.body to exist; when requests skip the JSON parser (e.g. GET introspection)
// we hand it a default object so the middleware stays happy.
const ensureBodyMiddleware = (req, _res, next) => {
  if (req.body === undefined) {
    req.body = {};
  }
  next();
};

let apolloServer;

export async function initGraphQL(app) {
  if (apolloServer) {
    return apolloServer;
  }

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // mount the GraphQL endpoint alongside the REST API
  app.use('/graphql', express.json(), ensureBodyMiddleware, expressMiddleware(server));

  apolloServer = server;
  return server;
}

export function getApolloServer() {
  return apolloServer;
}
