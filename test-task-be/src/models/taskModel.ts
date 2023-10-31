import { Schema, model, Document } from "mongoose";
import messageUtil from "../utilities/message";
import { status } from "../utilities/status";

export interface testTask extends Document {
  title: string;
  description: string;
  status: string;
}

const taskSchema = new Schema<testTask>({
    title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: status,
    default: messageUtil.PENDING,
  },

});

const taskModel = model<testTask>("testTask", taskSchema);

export { taskModel };
