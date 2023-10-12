const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "A person must have a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confrim your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Please reenter the same password",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  mobileNumber: {
    type: String,
    length: 10,
  },
  dob: {
    type: Date,
  },
  tasks: [
    {
      text: { type: String, default: "task" },
      deadline: Date,
      priority: { type: Number, default: 1 },
      status: { type: Boolean, default: false },
    },
  ],
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
