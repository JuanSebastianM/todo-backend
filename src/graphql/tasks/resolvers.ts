import { Resolvers } from 'generatedTypes/tasks';

export const resolvers: Resolvers = {
  Query: {
    tasks: async (_parent, { authorEmail }, { dataSources }) => {
      const tasks = await dataSources.tasks.getAllTasksByAuhorEmail(
        authorEmail
      );

      return tasks;
    },
  },
  Mutation: {
    createTask: async (_parent, { authorEmail, task }, { dataSources }) => {
      const createdTask = await dataSources.tasks.createTask(task, authorEmail);

      return createdTask;
    },
    editTaskBody: async (_parent, { id, task }, { dataSources }) => {
      const updatedTask = await dataSources.tasks.editTaskBody(id, task);

      return updatedTask;
    },
    editTaskStatus: async (_parent, { id, done }, { dataSources }) => {
      const updatedTask = await dataSources.tasks.editTaskStatus(id, done);

      return updatedTask;
    },
    deleteTask: async (_parent, { id }, { dataSources }) => {
      const deletedTask = await dataSources.tasks.deleteTask(id);

      return deletedTask;
    },
  },
};
