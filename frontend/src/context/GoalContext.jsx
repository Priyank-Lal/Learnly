import { createContext, useEffect, useState } from "react";
import { fetchGoals } from "../api/api";
import { updateGoal } from "../api/api";

export const goalContext = createContext(null);

const GoalContext = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadGoals = async () => {
    setIsLoading(true);
    const { data } = await fetchGoals();
    setGoals(data.goals);
    setIsLoading(false);
  };

  const updateGoalAndRefresh = async (goalId, updateData) => {
    await updateGoal(goalId, updateData);
    await loadGoals();
  };

  useEffect(() => {
    loadGoals();
  }, []);
  return (
    <goalContext.Provider
      value={{ loadGoals, goals, isLoading, updateGoalAndRefresh }}
    >
      {children}
    </goalContext.Provider>
  );
};

export default GoalContext;
