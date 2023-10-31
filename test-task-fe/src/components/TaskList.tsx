"use client";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import TaskFilter from "./TaskFilter";
import axiosClient from "@/utilities/helper";
import { useSearchParams } from "next/navigation";

interface allTask {
  description: string;
  status: string;
  title: string;
  _id: string;
  __v: number;
}

const TaskList = () => {
  const [allTasks, setAllTasks] = useState<allTask[]>([]);

  const searchParams = useSearchParams();
  const tasksFilter = searchParams.get("tasks");

  useEffect(() => {
    axiosClient()
      .get(`/test`)
      .then((res) => {
        setAllTasks(res?.data?.data);
      })
      .catch((err) => {
        setAllTasks([]);
      });
  }, []);

  //@ts-ignore
  let filteredTasks: types.Array<Instance<typeof TaskModel>> = allTasks;

  if (tasksFilter === "pending") {
    filteredTasks = allTasks.filter((task) => task.status === "pending");
  } else if (tasksFilter === "in_progress") {
    filteredTasks = allTasks.filter((task) => task.status === "in_progress");
  } else if (tasksFilter === "completed") {
    filteredTasks = allTasks.filter((task) => task.status === "completed");
  }

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8 sm:mb-14">
        <h2 className="text-2xl font-semibold">
          All The{" "}
          {tasksFilter === "pending"
            ? "Pending"
            : tasksFilter === "in_progress"
            ? "In Progress"
            : tasksFilter === "completed"
            ? "Completed"
            : ""}{" "}
          Tasks
        </h2>
        <AddTask setAllTasks={setAllTasks} allTasks={allTasks} />
      </div>

      <TaskFilter />

      <div className="flex flex-col gap-2 px-4 py-5 max-h-[600px] overflow-auto">
        {filteredTasks?.map((task: any) => (
          <Task
            key={task._id}
            _id={task._id}
            title={task.title}
            description={task.description}
            status={task.status}
            setAllTasks={setAllTasks}
            allTasks={allTasks}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
