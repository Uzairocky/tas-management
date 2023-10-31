import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";
import { useRouter } from "next/navigation";
import axiosClient from "@/utilities/helper";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

interface allTask {
  description: string;
  status: string;
  title: string;
  _id: string;
  __v: number;
}

interface EditTaskProps {
  _id: string;
  title: string;
  description: string;
  status: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  allTasks: allTask[];
  setAllTasks: Dispatch<SetStateAction<allTask[]>>;
}

const EditTask = ({
  _id,
  title,
  description,
  status,
  open,
  setOpen,
  setAllTasks,
  allTasks,
}: EditTaskProps) => {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newStatus, setNewStatus] = useState<string>(status);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
    setNewStatus(status);
  }, [title, description, status]);

  const handleEditedTask = async (e: any) => {
    e.preventDefault();

    if (newTitle.length < 3) {
      setError("Please enter a title with at least 3 characters");
    } else if (newDescription.length < 3) {
      setError("Please enter a description with at least 3 characters");
    } else if (!newStatus) {
      setError("Please select a status for the task");
    } else {
      const editedTask = {
        title: newTitle,
        description: newDescription,
        status: newStatus,
      };

      await axiosClient()
        .put(`/test/${_id}`, editedTask)
        .then((res) => {
          let updatedTask = res?.data?.data;
          setAllTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === updatedTask._id ? updatedTask : task
            )
          );
        })
        .catch((error) => {
          console.log("ERROR WHILE EDITING TASK: ", error);
        });

      // Reset the input values
      setNewTitle("");
      setNewDescription("");
      setNewStatus("");
      setError("");
      setOpen(!open);
      router.refresh();
    }
  };

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-xl">Edit Task</DialogTitle>
        <DialogDescription>
          Edit or Update Your Task here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleEditedTask}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-left">
              Title
            </Label>
            <Input
              id="name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              id="description"
              rows={5}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="status" className="text-left">
              Status
            </Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Task Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <p className="text-center py-1 rounded bg-error-background text-error-foreground">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditTask;
