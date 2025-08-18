const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getUser,
  updateDetails,
  updatePassword,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/get-user", authMiddleware, getUser);
router.patch("/update-details", authMiddleware, updateDetails);
router.patch("/update-password", authMiddleware, updatePassword);
router.delete("/delete-user", authMiddleware, deleteUser )

module.exports = router;
