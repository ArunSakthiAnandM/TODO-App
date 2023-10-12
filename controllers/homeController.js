const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../modals/user_modal");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const authController = require("./authController");

exports.enroll = catchAsync(async (req, res, next) => {
  const { userName, email, password, passwordConfirm, dob, mobileNumber } =
    req.body;

  if (
    !userName ||
    !email ||
    !password ||
    !passwordConfirm ||
    !dob ||
    !mobileNumber
  ) {
    return next(new AppError("Please provide valid credentials", 400, res));
  }

  const user = await User.findOne({ email });
  if (user) {
    return next(new AppError("Email already in use", 400, res));
  }

  const newUser = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    dob: req.body.dob,
    mobileNumber: req.body.mobileNumber,
  });
  res.status(200).render("login.pug", {});
});

exports.login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Provide valid email and password", 400, res));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or Password", 401, res));
  }

  authController.createSendToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1),
    httpOnly: true,
  });
  res.status(200).json({ status: "sucess" });
});
