const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  const user = req.user;
  try {
    res.status(200).json({
      message: "User Found",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { _id } = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(404).json({
      message: "Password is/are missing",
    });
  }

  try {
    const validPassword = await bcrypt.compare(
      currentPassword,
      req.user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await userModel
      .findOneAndUpdate(
        {
          _id: _id,
        },
        {
          password: newHashedPassword,
        },
        { new: true }
      )
      .select("-password");

    return res.status(200).json({
      message: "Password Updated Successfully",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

const updateDetails = async (req, res) => {
  const { _id } = req.user;
  const { username, email } = req.body;

  try {
    const user = await userModel.findOneAndUpdate(
      { _id },
      { username, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "No User Found",
      });
    }

    return res.status(200).json({
      message: "User Details Updated Successfully",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.user;
  try {
    await userModel.findOneAndDelete({
      _id: _id,
    });

    return res.status(200).json({
      message: "User account deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  }
};
module.exports = {
  getUser,
  updatePassword,
  updateDetails,
  deleteUser,
};
