const express = require("express");
const catchAsync = require("../utils/catchAsync");
const User = require("../modals/user_modal");

const filterObj = (obj, ...fields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.addNewTask = catchAsync(async (req, res) => {
  const filteredBody = {
    tasks: req.user.tasks.concat(
      filterObj(req.body, "text", "deadline", "priority", "status")
    ),
  };

  const updatedTaksList = await User.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.redirect("/user/new-todo");
});

exports.newTodo = catchAsync(async (req, res) => {
  res.redirect("/user/todo");
});

exports.updateProfile = catchAsync(async (req, res) => {
  const filteredBody = filterObj(req.body, "userName", "email", "mobileNumber");

  const update = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // res.redirect("/user/profile");
  res.status(200).json({ status: "sucess" });
});

exports.markTaskComplete = async (req, res) => {
  function checkID(el) {
    return el.id === req.body.id;
  }

  let taskStatus = req.user.tasks.find(checkID).status;
  req.user.tasks.find(checkID).status = !taskStatus;

  const filteredBody = {
    tasks: req.user.tasks,
  };

  const update = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // res.redirect("/user/new-todo");
  res.status(200).json({
    status: "sucess",
  });
};
