import { ApolloServer, BaseContext } from '@apollo/server';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectToDB } from 'db/index';
import { TaskModel } from 'db/models/Task';
import { readFileSync } from 'fs';
import { TasksDataSource } from 'graphql/datasources/Task';
import { resolvers } from 'graphql/tasks/resolvers';
import depthLimit from 'graphql-depth-limit';

export interface ContextValue extends BaseContext {
  authorizationToken: string;
  dataSources: {
    tasks: TasksDataSource;
  };
}

const connection = await connectToDB();

if (!connection) {
  throw new Error('Could not connect to DB');
}

const typeDefs = readFileSync('src/graphql/tasks/typeDefs.graphql', 'utf-8');

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(2)],
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const authorizationToken = req.headers.authorization || '';
    const tasksDataSource = new TasksDataSource(TaskModel);

    return {
      authorizationToken,
      dataSources: {
        tasks: tasksDataSource,
      },
    };
  },
});

console.log(`🚀 Server ready at: ${url}`);
