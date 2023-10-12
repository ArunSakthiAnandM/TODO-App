exports.homeRoute = (req, res) => {
  res.status(200).render("home.pug", {});
};

exports.loginRoute = (req, res) => {
  res.status(200).render("login.pug", {});
};

exports.enrollRoute = (req, res) => {
  res.status(200).render("enroll.pug", {});
};

exports.todoRoute = (req, res) => {
  res.status(200).render("todo.pug", {});
};

exports.profileRoute = (req, res) => {
  res.status(200).render("profile.pug", {});
};
