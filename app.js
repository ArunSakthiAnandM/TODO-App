const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const mongoSanitise = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const hpp = require("hpp");

const homeRoute = require("./routes/homeRoute");
const userRoute = require("./routes/userRoute");
const viewRouter = require("./routes/viewRoutes");
const AppError = require("./utils/appError");

// Start express app
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "http://127.0.0.1:3000",
          "ws://localhost:53436/",
        ],
      },
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimiter({
  max: 100,
  windwMs: 60 * 60 * 1000,
  message: "Too many requests from this ip",
});
app.use("/", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use(mongoSanitise());

app.use(xss());

app.use(
  hpp({
    whitelist: ["priority"],
  })
);

app.use(cors());

app.use((req, res, next) => {
  // console.log(req.cookies);
  next();
});

// ROUTES

app.use("/", viewRouter);
app.use("/home", homeRoute);
app.use("/user", userRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;

/*
TODO

sort by deadline, priority
email auth
payment

*/
