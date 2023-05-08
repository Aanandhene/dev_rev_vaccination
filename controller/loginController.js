const userModel = require("../models/users");

module.exports.loginUser = async (req, res) => {
  const { userEmail, userPwd, userType } = req.body;
  try {
    const user = await userModel.login(userEmail, userPwd, userType);
    if (user.userType === "admin") {
      //TODO Set Cookie for admin and need to done protected route controller and add up on middleware
      res.status(200).json({
        status: "success",
        message: "Logged in Successfully - Admin",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Logged in Successfully - user",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Logged in Failed due to " + error.message,
    });
  }
};
