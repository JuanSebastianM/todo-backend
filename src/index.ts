import { ApolloServer } from '@apollo/server';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from 'schema/tasks/resolvers';
import { typeDefs } from 'schema/tasks/typeDefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  apollo: {
    key: process.env.APOLLO_KEY,
  },
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
