"use client";

import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import EditTask from "./EditTask";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import axiosClient from "@/utilities/helper";
import { Dialog, DialogTrigger } from "./ui/Dialog";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

interface allTask {
  description: string;
  status: string;
  title: string;
  _id: string;
  __v: number;
}

interface TaskProps {
  _id: string;
  title: string;
  description: string;
  status: string;
  allTasks: allTask[];
  setAllTasks: Dispatch<SetStateAction<allTask[]>>;
}

const Task = ({
  _id,
  title,
  description,
  status,
  setAllTasks,
  allTasks,
}: TaskProps) => {
  const [open, setOpen] = useState(false);

  const handleDeleteTask = (_id: any) => {
    axiosClient()
      .delete(`/test/${_id}`)
      .then((res) => {
        let deletedTask = res?.data?.data;
        let filteredArray = allTasks?.filter((task) => {
          return task?._id !== deletedTask?._id;
        });
        setAllTasks(filteredArray);
      })
      .catch((error) => {
        console.log("ERROR WHILE DELETING TASK: ", error);
      });
  };

  return (
    <div className="relative bg-white p-4 rounded shadow mt-1 border-b border-slate-300 max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>

        <div className="flex gap-1 sm:gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil2Icon className="w-5 h-5 text-blue-500" />
              </Button>
            </DialogTrigger>

            <EditTask
              _id={_id}
              title={title}
              description={description}
              status={status}
              open={open}
              setOpen={setOpen}
              setAllTasks={setAllTasks}
              allTasks={allTasks}
            />
          </Dialog>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteTask(_id)}
          >
            <TrashIcon className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      </div>

      <Badge
        className="my-2"
        variant={
          status === "pending"
            ? "error"
            : status === "in_progress"
            ? "warning"
            : "success"
        }
      >
        {status === "pending"
          ? "Pending"
          : status === "in_progress"
          ? "In Progress"
          : "Completed"}
      </Badge>

      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
};

export default Task;
