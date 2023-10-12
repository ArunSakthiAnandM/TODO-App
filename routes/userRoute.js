const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/todo").post(authController.protect, userController.addNewTask);

router.route("/new-todo").get(authController.protect, userController.newTodo);

router
  .route("/profile")
  .post(authController.protect, userController.updateProfile);

router
  .route("/update-todo")
  .patch(authController.protect, userController.markTaskComplete);

module.exports = router;
