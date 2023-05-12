const task = {
  id: 1,
  title: 'Task 1',
  description: 'Description 1',
  done: false,
};

const tasks = [task];

export const resolvers = {
  Query: {
    getAllTasks: () => {
      return tasks;
    },
  },
  Mutation: {
    createTask: (_parent: any, args: any, _context: any) => {
      const newTask = {
        id: 1,
        title: args.title,
        description: args.description,
        done: false,
      };

      tasks.push(newTask);

      return newTask;
    },
    editTask: () => {
      return [];
    },
    deleteTask: () => {
      return [];
    },
  },
};
