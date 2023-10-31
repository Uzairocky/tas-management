import dotenv from 'dotenv'; 
import cors from "cors"; //Import the cors package
import express, { Application } from "express";
import { connectDB } from "./config/mongoose";
import router from "./routes/mainRoutes";
import messageUtil from "./utilities/message";

dotenv.config(); //Load Enviornment Variables

const app: Application = express();

//Database connection
connectDB();

//Use the cors middleware to enable CORS
app.use(cors());

app.use(express.json({}));

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`${messageUtil.APP_RUNNING_ON_PORT} ${process.env.PORT}`);
});
