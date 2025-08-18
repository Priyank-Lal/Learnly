import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Calendar, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const GoalCard = ({ goal, index }) => {
  const isCompleted = goal.progress >= 100;
  const daysRemaining = Math.ceil(
    (new Date(goal.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const getStatusColor = () => {
    if (isCompleted)
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    if (daysRemaining < 0)
      return "bg-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-500";
    if (daysRemaining <= 3)
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      if (daysRemaining <= 7)
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-500";

    return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
  };

  const getStatusText = () => {
    if (isCompleted) return "Completed";
    if (daysRemaining < 0) return "Overdue";
    if (daysRemaining <= 3) return "Urgent";
    if (daysRemaining <= 7) return "Soon";
    return "Active";
  };

  return (
    <motion.div
      key={goal._id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-md transition-all duration-300 cursor-pointer group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <Link to={`/goal-detail/${goal._id}`}>
          <CardContent className="">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-1">
                  {goal.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {goal.description}
                </p>
              </div>
              <div className="text-right ml-6 min-w-[100px]">
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {goal.progress}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Due {new Date(goal.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {goal.subTasks?.filter((st) => st.done).length || 0} of{" "}
                  {goal.subTasks?.length || 0} tasks completed
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
                >
                  {getStatusText()}
                </span>
              </div>

              <Progress
                value={goal.progress}
                className="h-2 w-full [&>div]:bg-[hsl(221.2_83.2%_53.3%)] dark:[&>div]:bg-blue-400"
              />
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default GoalCard;
