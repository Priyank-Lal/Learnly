import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "https://localhost:3000/",
  withCredentials: true,
});

export const registerAccount = (details) => api.post("/auth/register", details);
export const loginAccount = (details) => api.post("/auth/login", details);
export const logOutUser = () => api.post("/auth/logout");
export const getUser = () => api.get("/user/get-user");
export const createGoal = (goal) => api.post("/goals/create-goal", goal);
export const fetchGoals = () => api.get("/goals/get-goals");
export const fetchSingleGoal = (goalID) =>
  api.get(`/goals/get-single-goal/${goalID}`);
export const updateSubTask = (goalID, subTaskID) =>
  api.patch(`/goals/update-subtask/${goalID}/${subTaskID}`);
export const updateGoal = (goalID, payload) =>
  api.patch(`/goals/update-goal/${goalID}`, payload);
export const createSubtask = (goalID, payload) =>
  api.post(`/goals/create-subtask/${goalID}`, payload);
export const updateUserDetails = (payload) =>
  api.patch("/user/update-details", payload);
export const updateUserPassword = (payload) =>
  api.patch("/user/update-password", payload);
export const deleteGoal = (goalID) =>
  api.delete(`/goals/delete-goal/${goalID}`);
export const deleteSubTask = (goalID, subTaskID) =>
  api.delete(`/goals/delete-subtask/${goalID}/${subTaskID}`);
export const deleteUser = () => api.delete("/user/delete-user");
