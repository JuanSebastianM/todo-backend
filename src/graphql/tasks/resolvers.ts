import { GraphQLResolveInfo } from 'graphql';
import { Resolvers, Task } from 'generatedTypes/tasks';

const task: Task = {
  id: '1',
  title: 'Task 1',
  description: 'Description 1',
  done: false,
};

const tasks = [task];

export const resolvers: Resolvers = {
  Query: {
    getAllTasks: () => {
      return tasks;
    },
  },
  Mutation: {
    createTask: (
      _parent: any,
      args: any,
      _context: any,
      _info: GraphQLResolveInfo
    ) => {
      const newTask: Task = {
        id: '1',
        title: args.title,
        description: args.description,
        done: false,
      };

      tasks.push(newTask);

      return newTask;
    },
  },
};
