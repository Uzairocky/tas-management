import express, { Request, Response } from "express";
import messageUtil from "../utilities/message";
import { testTask } from "../models/taskModel";
import { create, get, deleteTask,  all, update } from "../services/taskService";

import {
  successResponse,
  notFoundResponse,
  serverErrorResponse,
} from "../utilities/response";


const createTask = async (req: Request, res: Response) => {
  try {

    let createTask: testTask | null  = await create({
      ...req.body,
    });
    return successResponse(res, messageUtil.TASK_CREATED, createTask);
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let testTask: testTask | null = await get({
      _id: id,
    });

    if (!testTask) return notFoundResponse(res, messageUtil.NOT_FOUND, {});
    return successResponse(res, messageUtil.TASK_FOUND, testTask);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const deleteTestTask = async (req: Request, res: Response) => {
    const { id } = req.params;
  let task : testTask | null  = await deleteTask({
    _id: id,
  });

  if (!task) return notFoundResponse(res, messageUtil.NOT_FOUND, {});

  return successResponse(res, messageUtil.TASK_DELETED, task);
};

const getAllTasks = async (req: Request, res: Response) => {
  try {
    let tasks: testTask[] | [] = await all({});

    if (tasks.length < 1) return notFoundResponse(res, messageUtil.NOT_FOUND, []);

    return successResponse(res, messageUtil.ALL_TASKS_FOUND, tasks);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const updateTask = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
      let updateTask: testTask | null  = await update(
        {
          _id: id,
        },
        {
          ...req.body,
        }
      );  

      if (!updateTask) return notFoundResponse(res, messageUtil.NOT_FOUND,{});
      
      return successResponse(res, messageUtil.TASK_UPDATED, updateTask);
    } catch (err) {
      return serverErrorResponse(res, err);
    }

}

export {
    getTask,
    updateTask,
    createTask,
    getAllTasks,
    deleteTestTask,
};
