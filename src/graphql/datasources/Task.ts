import { TaskModelType } from 'db/models/Task';
import { Task, TaskInput, TaskMutationResponse } from 'generatedTypes/tasks';
import { Task as MongoTaskType } from 'db/models/Task';
import { Document, Types } from 'mongoose';
import { GraphQLError } from 'graphql';
import { TaskResponseMessages } from 'utils/constants';

export class TasksDataSource {
  private taskModel;

  constructor(taskModel: TaskModelType) {
    this.taskModel = taskModel;
  }

  private throwUnauthenticatedUserError(): GraphQLError {
    throw new GraphQLError('Authentication key was not found', {
      extensions: { code: 'UNAUTHENTICATED', httpStatus: 401 },
    });
  }

  private getMappedTask(
    task: Document<unknown, {}, MongoTaskType> &
      Omit<
        MongoTaskType & {
          _id: Types.ObjectId;
        },
        never
      >
  ): Task {
    return {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      done: task.done,
      authorEmail: task.authorEmail,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  private getTaskMutationErrorResponse(
    error: unknown,
    defaultErrorMessage: string
  ): TaskMutationResponse {
    return {
      code: 400,
      message: error instanceof Error ? error.message : defaultErrorMessage,
      success: false,
    };
  }

  private getTaskMutationSuccessResponse(
    task: Task,
    message: string
  ): TaskMutationResponse {
    return {
      code: 200,
      message,
      success: true,
      task,
    };
  }

  async getAllTasksByAuthorEmail(authorEmail: string) {
    try {
      const tasks = await this.taskModel.find({ authorEmail });

      const mappedTasks = tasks.map((task) => {
        const mappedTask = this.getMappedTask(task);

        return mappedTask;
      });

      return mappedTasks;
    } catch (error) {
      console.error(error);

      return [];
    }
  }

  async getTaskById(id: string) {
    try {
      const task = await this.taskModel.findById(id);

      if (!task) {
        throw new Error(TaskResponseMessages.NOT_FOUND);
      }

      const mappedTask = this.getMappedTask(task);

      return mappedTask;
    } catch {
      return null;
    }
  }

  async createTask(
    taskInput: TaskInput,
    authorEmail: string,
    authenticationToken: string
  ): Promise<TaskMutationResponse> {
    if (!authenticationToken) {
      this.throwUnauthenticatedUserError();
    }

    try {
      const createdTask = await this.taskModel.create({
        title: taskInput.title,
        description: taskInput.description,
        authorEmail,
      });

      const mappedTask = this.getMappedTask(createdTask);

      return this.getTaskMutationSuccessResponse(
        mappedTask,
        TaskResponseMessages.CREATED
      );
    } catch (error) {
      console.error(error);

      return this.getTaskMutationErrorResponse(
        error,
        TaskResponseMessages.ERROR_CREATING
      );
    }
  }

  async editTaskBody(
    taskId: string,
    newTaskBody: TaskInput,
    authenticationToken: string
  ): Promise<TaskMutationResponse> {
    if (!authenticationToken) {
      this.throwUnauthenticatedUserError();
    }

    try {
      const updatedTask = await this.taskModel.findByIdAndUpdate(
        taskId,
        {
          $set: {
            title: newTaskBody.title,
            description: newTaskBody.description,
          },
        },
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        throw new Error(TaskResponseMessages.NOT_FOUND);
      }

      const mappedUpdatedTask = this.getMappedTask(updatedTask);

      return this.getTaskMutationSuccessResponse(
        mappedUpdatedTask,
        TaskResponseMessages.BODY_UPDATED
      );
    } catch (error) {
      console.error(error);

      return this.getTaskMutationErrorResponse(
        error,
        TaskResponseMessages.ERROR_UPDATING_BODY
      );
    }
  }

  async editTaskStatus(
    id: string,
    done: boolean,
    authenticationToken: string
  ): Promise<TaskMutationResponse> {
    if (!authenticationToken) {
      this.throwUnauthenticatedUserError();
    }

    try {
      const updatedTask = await this.taskModel.findByIdAndUpdate(
        id,
        {
          done,
        },
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        throw new Error(TaskResponseMessages.NOT_FOUND);
      }

      const mappedUpdatedTask = this.getMappedTask(updatedTask);

      return this.getTaskMutationSuccessResponse(
        mappedUpdatedTask,
        TaskResponseMessages.STATUS_UPDATED
      );
    } catch (error) {
      console.log(error);

      return this.getTaskMutationErrorResponse(
        error,
        TaskResponseMessages.ERROR_UPDATING_STATUS
      );
    }
  }

  async deleteTask(
    id: string,
    authenticationToken: string
  ): Promise<TaskMutationResponse> {
    if (!authenticationToken) {
      this.throwUnauthenticatedUserError();
    }

    try {
      const deletedTask = await this.taskModel.findByIdAndDelete(id);

      if (!deletedTask) {
        throw new Error(TaskResponseMessages.NOT_FOUND);
      }

      const mappedDeletedTask = this.getMappedTask(deletedTask);

      return this.getTaskMutationSuccessResponse(
        mappedDeletedTask,
        TaskResponseMessages.DELETED
      );
    } catch (error) {
      console.error(error);

      return this.getTaskMutationErrorResponse(
        error,
        TaskResponseMessages.ERROR_DELETING
      );
    }
  }
}
