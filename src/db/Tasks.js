import { Schema, model } from 'mongoose';
import { priorityList } from '../constants/tasks.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: priorityList,
      default: 'Without',
    },
    deadline: {
      type: Date,
      required: true,
    },

    columnId: {
      type: Schema.Types.ObjectId,
      ref: 'column',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
taskSchema.post('save', handleSaveError);

taskSchema.pre('findOneAndUpdate', setUpdateSettings);

taskSchema.post('findOneAndUpdate', handleSaveError);

// export const sortByListTasks = ['priority'];

const TasksCollection = model('task', taskSchema);

export default TasksCollection;
