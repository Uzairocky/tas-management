import mongoose from "mongoose";
import dotenv from 'dotenv';
import messageUtil from "../utilities/message";

dotenv.config(); //Load Enviornment Variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI || ""
    );

    console.log(messageUtil.DATABASE_CONNECTED);
  } catch (error: any) {
    console.log(messageUtil.DATABASE_CONNECTION_ISSUE, error);
  }
};
export { connectDB };
