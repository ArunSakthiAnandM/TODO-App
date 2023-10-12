const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to DB"));

// const User = require("./modals/user_schema");

// const testUser = new User({
//   userName: "Arun Skthi Anand",
//   email: "arunsakthiaand2001@gmail.com",
//   password: "arunsam.18",
//   passwordConfirm: "arunsam.18",
//   mobileNumber: 9843965600,
//   age: 21,
//   tasks: [
//     { text: "project 1", deadline: Date.now(), priority: "high", status: 1 },
//     { text: "project 2", deadline: "2023-07-27", priority: "high", status: 1 },
//   ],
// });

// testUser
//   .save()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error, "ERROR");
//   });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}.......`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
