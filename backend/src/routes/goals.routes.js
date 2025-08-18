const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal,
  updateSubTask,
  getGoalByID,
  createSubtask,
  deleteSubTask,
} = require("../controllers/goals.controller");

const router = express.Router();

router.post("/create-goal", authMiddleware, createGoal);
router.get("/get-goals", authMiddleware, getGoals);
router.get("/get-single-goal/:goalID", authMiddleware, getGoalByID);
router.post("/create-subtask/:goalID", authMiddleware, createSubtask);
router.delete("/delete-goal/:goalID", authMiddleware, deleteGoal);
router.patch("/update-goal/:goalID", authMiddleware, updateGoal);
router.patch(
  "/update-subtask/:goalID/:subTaskID",
  authMiddleware,
  updateSubTask
);
router.delete(
  "/delete-subtask/:goalID/:subTaskID",
  authMiddleware,
  deleteSubTask
);
module.exports = router;
