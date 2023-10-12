const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.route("/enroll").post(homeController.enroll);

router.route("/login").post(homeController.login);

router.route("/logout").get(homeController.logout);

module.exports = router;
