import React, { use, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  TrendingUp,
  Target,
  CheckCircle2,
  ArrowRight,
  ScrollText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AppSidebar from "../components/layout/AppSidebar";
import { useForm } from "react-hook-form";
import { X, FileText, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createGoal, fetchGoals } from "../api/api";
import Navbar from "../components/layout/Navbar";
import { goalContext } from "../context/GoalContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar1 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Dashboard = () => {
  const { goals, isLoading, loadGoals } = useContext(goalContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    loadGoals();
  }, []);

  function calculateDaysRemaining(dueDate) {
    const today = new Date(); // current date
    const due = new Date(dueDate); // user-selected due date

    // Difference in milliseconds
    const diffInMs = due - today;

    // Convert ms → days
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  }

  const completedGoals = goals.filter((goal) => goal.progress >= 100).length;
  const activeGoals = goals.filter((goal) => goal.progress < 100).length;
  const displayGoals = goals
    .filter((goal) => goal.progress < 100)
    .sort(
      (a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id)
    )
    .slice(0, 6);

  const handleViewMore = () => {
    navigate("/goals");
  };

  const totalProgress =
    goals.length > 0
      ? goals.reduce((acc, goal) => acc + (goal.progress || 0), 0) /
        goals.length
      : 0;
  const stats = [
    {
      title: "Active Goals",
      value: activeGoals,
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completed",
      value: completedGoals,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Average Progress",
      value: `${Math.round(totalProgress)}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];
  const submitHandler = async (data) => {
    if (!data.title || !data.description || !selectedDate) return;
    setIsSubmitting(true);
    try {
      const days = calculateDaysRemaining(selectedDate);
      const formData = {
        ...data,
        dueDate: selectedDate,
        days: days,
      };
      await createGoal(formData);
      await loadGoals();
      reset();
      setSelectedDate(null);
      toast.success("Goal created!");
    } catch (err) {
      toast.error("Failed to create goal");
    }
    setIsSubmitting(false);
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  //       <div className="lg:pl-64 pt-20">
  //         <div className="p-6 lg:p-8">
  //           <motion.div>
  //             {/* Header Skeleton */}
  //             <div className="mb-8">
  //               <Skeleton className="h-10 w-64 mb-2" />
  //               <Skeleton className="h-5 w-96" />
  //             </div>

  //             {/* Stats Grid Skeleton */}
  //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  //               {[1, 2, 3].map((index) => (
  //                 <motion.div
  //                   key={index}
  //                   initial={{ opacity: 0, y: 20 }}
  //                   animate={{ opacity: 1, y: 0 }}
  //                   transition={{ duration: 0.8, delay: index * 0.1 }}
  //                 >
  //                   <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
  //                     <CardContent className="px-6 py-2">
  //                       <div className="flex items-center justify-between">
  //                         <div className="space-y-2">
  //                           <Skeleton className="h-4 w-20" />
  //                           <Skeleton className="h-8 w-16" />
  //                         </div>
  //                         <Skeleton className="h-12 w-12 rounded-full" />
  //                       </div>
  //                     </CardContent>
  //                   </Card>
  //                 </motion.div>
  //               ))}
  //             </div>

  //             {/* Goals Section Header Skeleton */}
  //             <div className="flex items-center justify-between mb-6">
  //               <Skeleton className="h-8 w-32" />
  //               <Skeleton className="h-10 w-32" />
  //             </div>

  //             {/* Goals Grid Skeleton */}
  //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //               {[1, 2, 3, 4, 5, 6].map((index) => (
  //                 <motion.div
  //                   key={index}
  //                   initial={{ opacity: 0, y: 20 }}
  //                   animate={{ opacity: 1, y: 0 }}
  //                   transition={{ duration: 0.8, delay: index * 0.1 }}
  //                 >
  //                   <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
  //                     <CardHeader>
  //                       <div className="space-y-2">
  //                         <Skeleton className="h-6 w-3/4" />
  //                         <Skeleton className="h-4 w-full" />
  //                         <Skeleton className="h-4 w-2/3" />
  //                       </div>
  //                     </CardHeader>
  //                     <CardContent>
  //                       <div className="space-y-4">
  //                         <div>
  //                           <div className="flex items-center justify-between mb-2">
  //                             <Skeleton className="h-4 w-16" />
  //                             <Skeleton className="h-4 w-12" />
  //                           </div>
  //                           <Skeleton className="h-2 w-full" />
  //                         </div>
  //                         <div className="flex items-center justify-between">
  //                           <Skeleton className="h-4 w-24" />
  //                           <Skeleton className="h-4 w-20" />
  //                         </div>
  //                       </div>
  //                     </CardContent>
  //                   </Card>
  //                 </motion.div>
  //               ))}
  //             </div>
  //           </motion.div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="lg:pl-64 pt-20">
        <div className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
                Welcome back!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Here's an overview of your goal progress
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardContent className="px-6 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm md:text-md font-medium text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-200">
                            {stat.title}
                          </p>
                          <p className="text-3xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                            {stat.value}
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-full ${stat.bgColor} dark:bg-opacity-20`}
                        >
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                Your Goals
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Button className="bg-[#2463eb] hover:bg-[#1d4ed8] dark:text-white cursor-pointer hover:shadow-lg transition-all duration-300">
                      <Plus className="h-4 w-4" />
                      Add Goal
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ">
                  <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="space-y-6 mt-3"
                  >
                    <DialogHeader>
                      <DialogTitle className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                        <Target className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
                        Create New Goal
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Set up a new goal and let{" "}
                        <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent font-bold">
                          Artificial Intelligence
                        </span>{" "}
                        help you break it down into achievable steps.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Label
                        htmlFor="goal-title"
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Goal Title
                      </Label>
                      <Input
                        id="goal-title"
                        placeholder="e.g., Learn React Development"
                        {...register("title")}
                        required
                        className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="due-date"
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <Calendar1 className="mr-2 h-4 w-4" />
                        Due Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600",
                              !selectedDate &&
                                "text-gray-500 dark:text-gray-400"
                            )}
                            disabled={isSubmitting}
                          >
                            {/* <Calendar1 className="mr-2 h-4 w-4" /> */}
                            {selectedDate ? (
                              format(selectedDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="bg-white dark:bg-blue-300"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="goal-description"
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <ScrollText className="mr-2 h-4 w-4" />
                        Description
                      </Label>
                      <Textarea
                        id="goal-description"
                        placeholder="Describe your goal and what you want to achieve..."
                        {...register("description")}
                        rows={3}
                        maxLength={200}
                        required
                        disabled={isSubmitting}
                        className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>

                    <DialogFooter>
                      <div className="flex justify-end space-x-3 pt-4">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                            disabled={isSubmitting}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          className="bg-[#2463eb] text-white px-6 hover:bg-[#1d4ed8] cursor-pointer hover:shadow-lg transition-all duration-300"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Creating..." : "Create Goal"}
                        </Button>
                      </div>
                    </DialogFooter>

                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayGoals.map((goal, index) => (
                <motion.div
                  key={goal._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <Link to={`/goal-detail/${goal._id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                              {goal.title}
                            </CardTitle>
                            <CardDescription className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-1">
                              {goal.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Progress
                              </span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {goal.progress}%
                              </span>
                            </div>
                            <Progress
                              value={goal.progress}
                              className="h-2 [&>div]:bg-[hsl(221.2_83.2%_53.3%)] dark:[&>div]:bg-blue-400"
                            />
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <Calendar1 className="h-4 w-4 mr-1" />
                              Due: {new Date(goal.dueDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {goal.subTasks.length} subtasks
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}

              {displayGoals.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <Target className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No goals yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Create your first goal to get started
                  </p>
                </motion.div>
              )}
            </div>
            {activeGoals > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full mt-8 flex justify-end items-center"
              >
                <Button
                  onClick={handleViewMore}
                  className="bg-[#2463eb] hover:bg-[#1d4ed8] dark:text-white cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                  View More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
