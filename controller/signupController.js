const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const passwordRules = require("./passwordValidation");
var checkPassword;

module.exports.saveUser = async (req, res) => {
  const {
    userEmail,
    userType,
    userName,
    userPwd,
    userGender,
    userDob,
    userAddress,
    userPhone,
    userAadhaar,
    userPan,
  } = req.body;
  try {
    checkPassword = passwordRules.validate(userPwd, { details: true });
    if (checkPassword.length == 0) {
      hashedPassword = await bcrypt.hash(userPwd, 10);
      await userModel.create({
        userType,
        email: userEmail,
        password: hashedPassword,
        name: userName,
        gender: userGender,
        dob: new Date(userDob),
        address: userAddress,
        phone: userPhone,
        aadhaar: userAadhaar,
        pan: userPan,
      });
      res.status(201).json({
        status: "success",
        message: "User Created Successfully",
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Password should match the requirements",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
};

module.exports.editUser = async (req, res) => {
  const {
    userId,
    userName,
    userGender,
    userDob,
    userAddress,
    userPhone,
    userAadhaar,
    userPan,
  } = req.body;

  try {
    console.log(userDob);
    await userModel.updateOne(
      { _id: userId },
      {
        $set: {
          name: userName,
          gender: userGender,
          dob: new Date(userDob),
          address: userAddress,
          phone: userPhone,
          aadhaar: userAadhaar,
          pan: userPan,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Updated Successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: "Update Failed due to : " + e.message,
    });
  }
};

module.exports.removeUser = async (req, res) => {
  const { userId } = req.body;
  try {
    await userModel.deleteOne({ _id: userId });
    res.status(200).json({
      status: "success",
      message: "Removed user Successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: "Remove Failed due to : " + e.message,
    });
  }
};
module.exports.changeRole = async (req, res) => {
  const { userId, userRole } = req.body;

  try {
    await userModel.updateOne(
      { _id: userId },
      {
        $set: {
          userType: userRole,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Updated user role Successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: "Update Failed due to : " + e.message,
    });
  }
};
