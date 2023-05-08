const signupRouter = require("./routes/signupRoutes");
const vaccinationRouter = require("./routes/vaccinationRoutes");
const loginRouter = require("./routes/loginRoutes");
const locationRouter = require("./routes/locationRoutes");
const logsRouter = require("./routes/logRoutes");
module.exports = function (app) {
  app.use("/signup", signupRouter);
  app.use("/login", loginRouter);
  app.use("/vaccine", vaccinationRouter);
  app.use("/location", locationRouter);
  app.use("/logs", logsRouter);
};
