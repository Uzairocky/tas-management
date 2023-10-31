import { testTask, taskModel as taskSchema } from "../models/taskModel";
import {
  HydratedDocument,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";

function create(input: HydratedDocument<testTask>) {
  return taskSchema.create(input);
}

function get(query: FilterQuery<testTask>) {
  return taskSchema.findOne(query);
}

function update(
    query: FilterQuery<testTask>,
    update: UpdateQuery<testTask>,
    options: QueryOptions = { new: true }
  ) {
    return taskSchema.findOneAndUpdate(query, update, options);
  }
  

async function deleteTask(query: FilterQuery<testTask>) {
  return await taskSchema.findByIdAndRemove(query);
}

function all(query: FilterQuery<testTask>) {
  return taskSchema.find(query);
}

export { create, get, deleteTask,  all, update };
