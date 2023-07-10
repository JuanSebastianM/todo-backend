import { Resolvers } from 'generatedTypes/tasks';

export const resolvers: Resolvers = {
  Query: {
    tasks: async (_parent, { authorEmail }, { dataSources }) => {
      const tasks = await dataSources.tasks.getAllTasksByAuthorEmail(
        authorEmail
      );

      return tasks;
    },
  },
  Mutation: {
    createTask: async (
      _parent,
      { authorEmail, task },
      { dataSources, authorizationToken }
    ) => {
      const createdTask = await dataSources.tasks.createTask(
        task,
        authorEmail,
        authorizationToken
      );

      return createdTask;
    },
    editTaskBody: async (
      _parent,
      { id, task },
      { dataSources, authorizationToken }
    ) => {
      const updatedTask = await dataSources.tasks.editTaskBody(
        id,
        task,
        authorizationToken
      );

      return updatedTask;
    },
    editTaskStatus: async (
      _parent,
      { id, done },
      { dataSources, authorizationToken }
    ) => {
      const updatedTask = await dataSources.tasks.editTaskStatus(
        id,
        done,
        authorizationToken
      );

      return updatedTask;
    },
    deleteTask: async (
      _parent,
      { id },
      { dataSources, authorizationToken }
    ) => {
      const deletedTask = await dataSources.tasks.deleteTask(
        id,
        authorizationToken
      );

      return deletedTask;
    },
  },
};
