import { useContext } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Target,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { goalContext } from "../context/GoalContext";;
import GoalCard from "../components/layout/GoalCard";

const CATEGORY_COLORS = [
  "#6366F1", // Indigo
  "#22C55E", // Emerald
  "#EAB308", // Yellow (softer than amber)
  "#F43F5E", // Rose
  "#0EA5E9", // Sky Blue
  "#8B5CF6", // Violet
  "#F97316", // Orange
  "#14B8A6", // Teal
  "#84CC16", // Lime
  "#EC4899", // Pink
];

export default function Analytics() {
  const { goals } = useContext(goalContext);

  const categoryCounts = goals.reduce((acc, goal) => {
    const cat = goal.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const totalGoals = goals.length || 1;
  const categoryData = Object.entries(categoryCounts).map(
    ([name, count], idx) => ({
      name,
      value: Math.round((count / totalGoals) * 100),
      count,
      color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
    })
  );

    const getGoalsCompletedThisWeek = () => {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Start of current week (Sunday)
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // End of current week (Saturday)
      endOfWeek.setHours(23, 59, 59, 999);

      return goals.filter((goal) => {
        if (goal.progress >= 100) {
          return true;
        }
        return false;
      }).length;
    };

  const totalSubtasks = goals.reduce(
    (acc, goal) => acc + goal?.subTasks?.length,
    0
  );
  const completedSubtasks = goals.reduce(
    (acc, goal) => acc + goal?.subTasks?.filter((st) => st.done).length,
    0
  );
  const averageProgress =
    goals.reduce((acc, goal) => acc + goal?.progress, 0) / goals.length || 0;
  const completedGoals = goals.filter((goal) => goal.progress >= 100).length;
  const completionRate = Math.round((completedGoals / totalGoals) * 100) || 0;
  const activeGoals = goals.filter((goal) => goal.progress < 100).length;
  const stats = [
    {
      title: "Completion Rate",
      // value: `${Math.round((completedSubtasks / totalSubtasks) * 100) || 0}%`,
      value: completionRate + "%",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Goals completed successfully",
    },
    {
      title: "Average Progress",
      value: `${Math.round(averageProgress)}%`,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Across all active goals",
    },
    {
      title: "Active Goals",
      value: activeGoals,
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Currently being worked on",
    },
    {
      title: "Goals This Week",
      value: getGoalsCompletedThisWeek(),
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Completed this week",
    },
  ];

  const activeGoalSubtaskBarData = goals
    .filter((goal) => goal.progress < 100)
    .map((goal, idx) => ({
      idx: idx + 1,
      title: goal.title,
      completedSubtasks: goal.subTasks
        ? goal.subTasks.filter((st) => st.done).length
        : 0,
    }));

  const mockStatusData = [
    { name: "Active", value: activeGoals, color: "#3B82F6" },
    { name: "Completed", value: completedGoals, color: "#10B981" },
  ];

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
                Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Insights into your goal-crushing performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 h-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardContent className="md:h-34 lg:h-32 xl:h-28">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-full ${stat.bgColor} dark:bg-opacity-20`}
                        >
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                          {stat.value}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white mb-1 transition-colors duration-200">
                          {stat.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                          {stat.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">
                    Goal Categories
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Distribution of your goals by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={275}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        // innerRadius={60}
                        // outerRadius={120}
                        // paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {categoryData.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {category.name}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {category.value}% ({category.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">
                    Goal Status Distribution
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Breakdown of your goals by current status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={275}>
                    <PieChart>
                      <Pie
                        data={mockStatusData}
                        cx="50%"
                        cy="50%"
                        // innerRadius={60}
                        // outerRadius={120}
                        // paddingAngle={5}
                        dataKey="value"
                      >
                        {mockStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    {mockStatusData.map((status) => (
                      <div
                        key={status.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: status.color }}
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {status.name}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {status.value} goals
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Sub-Tasks Completed per Active Goal
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Number of completed sub-tasks for each active goal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={activeGoalSubtaskBarData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-gray-200 dark:stroke-gray-700"
                    />
                    <XAxis
                      dataKey="idx"
                      tick={false}
                      axisLine={false}
                      label={null}
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <YAxis
                      allowDecimals={false}
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white dark:bg-gray-700 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {data.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Completed Sub-Tasks: {data.completedSubtasks}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend className="text-gray-600 dark:text-gray-400" />
                    <Bar
                      dataKey="completedSubtasks"
                      fill="#3B82F6"
                      name="Completed Sub-Tasks"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">
                    Goal Breakdown
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Detailed view of all your goals and their progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {goals
                      .slice()
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt || b._id) -
                          new Date(a.createdAt || a._id)
                      )
                      .map((goal, index) => (
                        <GoalCard key={goal._id} goal={goal} index={index} />
                      ))}

                    {goals.length === 0 && (
                      <div className="text-center py-12">
                        <BarChart3 className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          No goals to analyze yet
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          Create your first goal to see analytics
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
