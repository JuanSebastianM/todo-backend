import { Resolvers, Task } from 'generatedTypes/tasks';
import { TaskModel } from 'db/models/Task';

export const resolvers: Resolvers = {
  Query: {
    tasks: async (_parent, args) => {
      try {
        const tasks = await TaskModel.find({ authorEmail: args.authorEmail });

        const mappedTasks: Task[] = tasks.map((task) => {
          return {
            id: task._id.toString(),
            title: task.title,
            description: task.description,
            done: task.done,
            authorEmail: task.authorEmail,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
          };
        });

        return mappedTasks;
      } catch (error) {
        console.error(error);

        return [];
      }
    },
  },
  Mutation: {
    createTask: async (_parent, args) => {
      try {
        const createdTask = await TaskModel.create({
          title: args.task.title,
          description: args.task.description,
          authorEmail: args.authorEmail,
        });

        const mappedTask: Task = {
          id: createdTask._id.toString(),
          title: createdTask.title,
          description: createdTask.description,
          done: createdTask.done,
          authorEmail: createdTask.authorEmail,
          createdAt: createdTask.createdAt,
          updatedAt: createdTask.updatedAt,
        };

        return {
          code: 200,
          message: 'Task created successfully',
          success: true,
          task: mappedTask,
        };
      } catch (error) {
        console.error(error);

        return {
          code: 400,
          message:
            error instanceof Error
              ? error.message
              : 'Error creating task. Please try again.',
          success: false,
        };
      }
    },
  },
};
