import { ApolloServer, ApolloServerPlugin, BaseContext } from '@apollo/server';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginSchemaReporting } from '@apollo/server/plugin/schemaReporting';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { resolvers } from 'tasks/resolvers';

const typeDefs = readFileSync('src/graphql/tasks/typeDefs.graphql', 'utf-8');

const plugins: ApolloServerPlugin[] = [ApolloServerPluginSchemaReporting()];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    ApolloServerPluginLandingPageProductionDefault({
      embed: true,
      graphRef: process.env.APOLLO_GRAPH_REF ?? '',
    })
  );
} else {
  ApolloServerPluginLandingPageLocalDefault({ embed: true });
}

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
  plugins,
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at: ${url}`);
