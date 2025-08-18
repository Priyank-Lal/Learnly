const goalModel = require("../models/goals.model");
const { generateCategory, generateTask } = require("../services/ai.service");

const createGoal = async (req, res) => {
  const { title, description, dueDate, days } = req.body;
  const { _id } = req.user;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required",
    });
  }

  try {
    const response = await generateTask(title, days, dueDate);
    const subTasks = response
      .split(/\d+\.\s+/) // numbers ke hisaab se split
      .filter(Boolean) // empty strings hatao
      .map((title) => ({
        title: title.trim(),
        done: false,
      }));
    const category = await generateCategory(title);

    const allowedCategories = [
      "Learning",
      "Career",
      "Health",
      "Personal",
      "Other",
    ];
    if (!allowedCategories.includes(category)) {
      category = "Other";
    }

    const goal = await goalModel.create({
      userId: _id,
      title,
      description,
      dueDate,
      subTasks,
      category,
      progress: 0,
    });

    res.status(201).json({
      message: "Goal Created Successfully",
      goal,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

const getGoals = async (req, res) => {
  const { _id } = req.user;

  try {
    const goals = await goalModel.find({
      userId: _id,
    });

    res.status(200).json({
      message: "Goals Fetched Successfully",
      goals,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

const getGoalByID = async (req, res) => {
  const { _id } = req.user;
  const { goalID } = req.params;

  try {
    const goal = await goalModel.findOne({
      userId: _id,
      _id: goalID,
    });

    if (!goal) {
      return res.status(404).json("No Goal Found");
    }

    res.status(200).json({
      message: "Goal Fetched Successfully",
      goal,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

const deleteGoal = async (req, res) => {
  const { goalID } = req.params;
  const { _id } = req.user;

  try {
    const deletedGoal = await goalModel.findOneAndDelete({
      _id: goalID,
      userId: _id,
    });
    if (!deletedGoal) {
      return res.status(404).json({
        message: "No Goal Found",
      });
    }

    res.status(200).json({
      message: "Goal Deleted Successfully",
      goalDeleted: deletedGoal.title,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

const updateGoal = async (req, res) => {
  const { goalID } = req.params;
  const { _id } = req.user;
  // const { title, description, status, progress } = req.body;

  try {
    const updatedGoal = await goalModel.findOneAndUpdate(
      {
        _id: goalID,
        userId: _id,
      },
      req.body,
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({
        message: "No Goal Found",
      });
    }

    res.json({
      message: "Goal Updated successfully",
      updatedGoal,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

const updateSubTask = async (req, res) => {
  const { goalID, subTaskID } = req.params;
  const { _id } = req.user;

  try {
    const foundedGoal = await goalModel.findOne({
      userId: _id,
      _id: goalID,
    });

    if (!foundedGoal) {
      return res.status(404).json({
        message: "No Goal Found",
      });
    }

    const subTask = foundedGoal.subTasks.id(subTaskID);
    if (!subTask) {
      return res.status(404).json({
        message: "SubTask Not Found",
      });
    }

    subTask.done = !subTask.done;
    await foundedGoal.save();

    return res.json({ subTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

const createSubtask = async (req, res) => {
  const { goalID } = req.params;
  const { _id } = req.user;
  const { title } = req.body;

  try {
    // const foundedGoal = await goalModel.findOne({
    //   userId: _id,
    //   _id: goalID,
    // });

    // if (!foundedGoal) {
    //   return res.status(404).json({
    //     message: "No Goal Found",
    //   });
    // }

    await goalModel.findByIdAndUpdate(
      {
        _id: goalID,
        userId: _id,
      },
      {
        $push: { subTasks: { title: title, done: false } },
      },
      { new: true }
    );

    // await foundedGoal.save();

    return res.json({
      message: "Done",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

const deleteSubTask = async (req, res) => {
  const { subTaskID, goalID } = req.params;
  const { _id } = req.user;

  if (!subTaskID || !goalID) return;

  try {
    const foundedGoal = await goalModel.findOne({
      userId: _id,
      _id: goalID,
    });

    if (!foundedGoal) {
      return res.status(404).json({
        message: "No Goal Found",
      });
    }

    const subTask = foundedGoal.subTasks.id(subTaskID);
    if (!subTask) {
      return res.status(404).json({
        message: "SubTask Not Found",
      });
    }
    subTask.deleteOne()
    foundedGoal.save();

    return res.status(200).json({
      message: "Subtask Deleted Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

module.exports = {
  createGoal,
  getGoals,
  getGoalByID,
  deleteGoal,
  updateGoal,
  updateSubTask,
  createSubtask,
  deleteSubTask,
};
