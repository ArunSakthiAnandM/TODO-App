const express = require("express");

const routesController = require("./../controllers/routesController");
const authController = require("./../controllers/authController");
const homeController = require("./../controllers/homeController");

const router = express();

router.use(authController.isLoggedIn);

router.get("/home", routesController.homeRoute);

router.get("/home/login", routesController.loginRoute);

router.get("/home/enroll", routesController.enrollRoute);

router.get("/user/todo", authController.protect, routesController.todoRoute);

router.get(
  "/user/profile",
  authController.protect,
  routesController.profileRoute
);

module.exports = router;
