import mongoose from 'mongoose';

type Task = {
  title: string;
  description: string;
  done: boolean;
  authorEmail: string;
  createdAt: Date;
  updatedAt: Date;
};

type TaskModelType = mongoose.Model<Task>;

const TaskSchema = new mongoose.Schema<Task>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    done: {
      type: Boolean,
      default: false,
    },
    authorEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TaskModel: TaskModelType =
  mongoose.models.Task || mongoose.model<Task>('Task', TaskSchema);
