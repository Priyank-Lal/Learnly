import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  delay,
} from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Plus,
  Circle,
  Trash2,
  Target,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  createSubtask,
  deleteGoal,
  deleteSubTask,
  updateSubTask,
} from "../api/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { goalContext } from "../context/GoalContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "../components/layout/Loader";
import NumberFlow from "@number-flow/react";

const GoalDetail = () => {
  const { id } = useParams();
  const [loadingSubtaskId, setLoadingSubtaskId] = useState(null);
  const [completedSubtasks, setCompletedSubtasks] = useState(0);
  const [progress, setProgress] = useState(0);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingDeleteSubTask, setLoadingDeleteSubTask] = useState(null);
  const navigateTo = useNavigate();

  const { goals, updateGoalAndRefresh, loadGoals } = useContext(goalContext);
  const goal = goals.find((g) => g._id == id);
  const [status, setStatus] = useState(goal?.status);
  const progressMotionValue = useMotionValue(0);
  const progressTransform = useTransform(
    progressMotionValue,
    (value) => `${value}%`
  );

  useEffect(() => {
    if (!goal) return;
    const completedCount =
      goal?.subTasks?.filter((sub) => sub.done).length || 0;
    setCompletedSubtasks(completedCount);
    const total = goal?.subTasks?.length || 0;
    const progressNumber = total === 0 ? 0 : (completedCount / total) * 100;
    setProgress(Number(progressNumber.toFixed(1)));

    animate(progressMotionValue, progressNumber, {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.4,
    });

    if (progressNumber == 100) {
      setStatus("completed");
    }
  }, [goal, progressMotionValue]);

  useEffect(() => {
    if (!goal) return;
    // const handler = setTimeout(() => {
    if (progress !== goal.progress) {
      updateGoalAndRefresh(goal._id, { progress, status });
    }
    // }, 100);
    // return () => clearTimeout(handler);
  }, [progress, goal]);

  const toggleSubtask = async (goalID, subTaskID) => {
    setLoadingSubtaskId(subTaskID);
    try {
      await updateSubTask(goalID, subTaskID);
      await loadGoals();
    } catch (err) {
      toast.error("Failed to update subtask");
    }
    setLoadingSubtaskId(null);
  };

  const addNewSubTask = async (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) {
      toast.error("Subtask title cannot be empty");
      return;
    }
    setIsSubmitting(true);
    try {
      await createSubtask(goal._id, { title: newSubtaskTitle });
      setNewSubtaskTitle("");
      setIsAddingSubtask(false);
      await loadGoals();
      toast.success("Subtask added");
    } catch (err) {
      toast.error("Failed to add subtask");
      console.log(err);
    }
    setIsSubmitting(false);
  };

  const handleDeleteGoal = async (goalID) => {
    if (!goalID) {
      return toast.error("An error occured");
    }
    try {
      setLoadingDelete(true);
      await deleteGoal(goalID);
      setLoadingDelete(false);
      navigateTo("/dashboard");
      toast.success("Goal Deleted Successfully");
    } catch (error) {
      return toast.error("An error occured");
    }
  };

  const handleDeleteSubTask = async (goalID, subTaskID) => {
    if (!goalID) {
      return toast.error("An error occured");
    }

    try {
      setLoadingDeleteSubTask(subTaskID);
      await deleteSubTask(goalID, subTaskID);
      await loadGoals();
      toast.success("Subtask Deleted Successfully");
    } catch (error) {
      console.log(error);

      return toast.error("An error occured");
    }

    setLoadingDeleteSubTask(null);
  };

  if (!goal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Goal not found
        </h2>
        <Button
          onClick={() => navigateTo(-1)}
          className="transition-colors duration-200"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {loadingDelete && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-99">
          <Loader />
        </div>
      )}
      <div className="lg:pl-64 pt-16">
        <div className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              {/* <Button variant="ghost" onClick={() => navigateTo("/dashboard")}> */}
              <span
                onClick={() => navigateTo(-1)}
                className="mb-4 transition-colors duration-200 cursor-pointer flex items-center gap-2 hover:text-blue-600 w-fit dark:hover:text-blue-400 text-md "
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </span>
              {/* </Button> */}

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200 line-clamp-2">
                    {goal?.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-200 line-clamp-3">
                    {goal?.description}
                  </p>

                  <div className="flex items-center w-100 space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Due:{" "}
                      {new Date(goal.dueDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center">
                      <Target className="mr-2 h-4 w-4" />
                      {completedSubtasks} of {goal?.subTasks?.length} completed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Overall Progress
                      </span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        <NumberFlow value={goal?.progress} />%
                      </span>
                    </div>
                    <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[hsl(221.2_83.2%_53.3%)] dark:bg-blue-400 rounded-full"
                        style={{ width: progressTransform }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        <NumberFlow value={goal?.subTasks?.length} />
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Tasks
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        <NumberFlow value={completedSubtasks} />
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Completed
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        <NumberFlow
                          value={
                            (goal?.subTasks?.length ?? 0) - completedSubtasks
                          }
                        />
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Remaining
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white mb-1">
                      Subtasks
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Break down your goal into manageable steps
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2 ">
                    <Button
                      onClick={() => setIsAddingSubtask(true)}
                      className="bg-[#2463eb] text-white px-6 hover:bg-[#1d4ed8] cursor-pointer hover:shadow-lg transition-all duration-300"
                    >
                      <Plus className="h-4 w-4 " />
                      Add Task
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {isAddingSubtask && (
                    <motion.form
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 p-3 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20"
                      onSubmit={addNewSubTask}
                    >
                      <Input
                        placeholder="Enter subtask title..."
                        value={newSubtaskTitle}
                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                        autoFocus
                        className="flex-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        disabled={isSubmitting}
                      />
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-[#2463eb] text-white px-6 hover:bg-[#1d4ed8] cursor-pointer hover:shadow-lg transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Adding..." : "Add"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsAddingSubtask(false);
                          setNewSubtaskTitle("");
                        }}
                        className="cursor-pointer border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                    </motion.form>
                  )}

                  {goal?.subTasks?.map((subtask, index) => (
                    <motion.div
                      key={subtask._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      disabled={true}
                      className={`flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 `}
                    >
                      {loadingSubtaskId === subtask._id ? (
                        <motion.div
                          className="w-5 h-5 flex items-center justify-center"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "linear",
                          }}
                        >
                          <svg
                            className="w-5 h-5 text-blue-500 dark:text-blue-400 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                        </motion.div>
                      ) : (
                        <Checkbox
                          checked={subtask.done}
                          onCheckedChange={() =>
                            toggleSubtask(goal?._id, subtask._id)
                          }
                          disabled={loadingDeleteSubTask === subtask._id}
                          className="data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-400 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-400 data-[state=checked]:text-white cursor-pointer"
                        />
                      )}
                      <div className="flex-1 flex justify-between items-center">
                        <p
                          className={`${
                            subtask.done
                              ? "line-through text-gray-500 dark:text-gray-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {subtask.title}
                        </p>
                        <div className="flex items-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <MoreHorizontal className="w-5 h-5 cursor-pointer" />
                              <DropdownMenuContent className="">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeleteSubTask(goal?._id, subtask._id)
                                  }
                                  className="text-red-600 hover:!text-red-600 cursor-pointer dark:text-red-400 dark:hover:!text-red-400"
                                >
                                  {loadingDeleteSubTask === subtask._id ? (
                                    <>
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                      Deleting...
                                    </>
                                  ) : (
                                    <>
                                      Delete Subtask
                                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400 ml-1" />
                                    </>
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenuTrigger>
                          </DropdownMenu>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {goal?.subTasks?.length === 0 && !isAddingSubtask && (
                    <div className="text-center py-8">
                      <Circle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No subTasks yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Break down your goal into smaller, manageable tasks
                      </p>
                      <div className="flex justify-center space-x-2">
                        <Button
                          onClick={() => setIsAddingSubtask(true)}
                          className="transition-colors duration-200"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add First Task
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <div className="w-full flex justify-end mt-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="ml-4 bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-500 transition-colors duration-200 cursor-pointer"
                >
                  Delete Goal
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-900 dark:text-white">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                    This action cannot be undone. This will permanently delete
                    your Goal and remove data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteGoal(goal?._id)}
                    variant="destructive"
                    className="ml-4 bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-500 transition-colors duration-200 cursor-pointer"
                    disabled={loadingDelete}
                  >
                    {loadingDelete ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting Goal...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GoalDetail);
