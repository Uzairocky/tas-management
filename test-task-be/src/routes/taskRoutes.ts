import express from "express";
import {
    createTask,
    getAllTasks,
    deleteTestTask,
    getTask,
    updateTask
} from "../controllers/taskController";

const router = express.Router();

router.get("/:id", getTask);
router.post("/", createTask);
router.get("/",  getAllTasks);
router.put("/:id",updateTask);
router.delete("/:id",  deleteTestTask);

export default router;
