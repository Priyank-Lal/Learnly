import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { goalContext } from "../context/GoalContext";
import GoalCard from "../components/layout/GoalCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Goals = () => {
  const { goals, isLoading } = useContext(goalContext);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredGoals = goals.filter((goal) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "active") return goal.progress < 100;
    if (statusFilter === "completed") return goal.progress >= 100;
    return true;
  });

  const activeGoals = goals.filter((goal) => goal.progress < 100).length;
  const completedGoals = goals.filter((goal) => goal.progress >= 100).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="lg:pl-64 pt-20">
          <div className="p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Header Skeleton */}
              <div className="mb-8">
                <Skeleton className="h-10 w-48 mb-2" />
                <Skeleton className="h-5 w-80" />
              </div>

              {/* Filter Skeleton */}
              <div className="mb-6">
                <Skeleton className="h-10 w-64" />
              </div>

              {/* Goals Skeleton */}
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-80" />
                          </div>
                          <div className="flex items-center space-x-4">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-24" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

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
                My Goals
              </h1>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Track and manage all your goals in one place
              </p>
            </div>

            <div className="mb-6">
              <div className="flex space-x-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  className={`${
                    statusFilter === "all"
                      ? "bg-[#2463eb] hover:bg-[#1d4ed8] dark:text-white"
                      : ""
                  } cursor-pointer`}
                >
                  All ({goals.length})
                </Button>
                <Button
                  variant={statusFilter === "active" ? "default" : "outline"}
                  onClick={() => setStatusFilter("active")}
                  className={`${
                    statusFilter === "active"
                      ? "bg-[#2463eb] hover:bg-[#1d4ed8] dark:text-white"
                      : ""
                  } cursor-pointer`}
                >
                  Active ({activeGoals})
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  onClick={() => setStatusFilter("completed")}
                  className={`${
                    statusFilter === "completed"
                      ? "bg-[#2463eb] hover:bg-[#1d4ed8] dark:text-white"
                      : ""
                  } cursor-pointer`}
                >
                  Completed ({completedGoals})
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredGoals
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.createdAt || b._id) -
                    new Date(a.createdAt || a._id)
                )
                .map((goal, index) => (
                  <GoalCard key={goal._id} goal={goal} index={index} />
                ))}

              {filteredGoals.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Target className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {statusFilter === "all"
                      ? "No goals yet"
                      : `No ${statusFilter} goals`}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {statusFilter === "all"
                      ? "Create your first goal to get started"
                      : `You don't have any ${statusFilter} goals yet`}
                  </p>
                  <Link to="/dashboard">
                    <Button className="bg-[#2463eb] text-white hover:bg-[#1d4ed8] transition-all duration-300">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Goal
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
