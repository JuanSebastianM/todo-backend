import { ApolloServer, BaseContext } from '@apollo/server';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectToDB } from 'db/index';
import { readFileSync } from 'fs';
import { resolvers } from 'tasks/resolvers';

await connectToDB();

const typeDefs = readFileSync('src/graphql/tasks/typeDefs.graphql', 'utf-8');

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          embed: true,
          graphRef: process.env.APOLLO_GRAPH_REF ?? '',
        })
      : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at: ${url}`);
