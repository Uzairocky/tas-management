import express from "express";

import testRouter from "./taskRoutes";

const router = express.Router();

router.use("/test", testRouter);

export default router;
