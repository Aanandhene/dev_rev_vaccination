const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: [true, "Role of the user"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Valid Email Address"],
    unique: [true, " Account related to this Email is Already registered"],
    trim: true,
    lowercase: true,
    validate: [isEmail, "Please, enter a valid email "],
  },
  password: {
    type: String,
    required: [true, "Please Enter a password"],
    minLength: [8, "Minimum length of the password must be 8"],
  },
  name: {
    type: String,
    required: [true, "User Name Required"],
  },
  gender: {
    type: String,
    required: [true, "Gender Required"],
  },
  dob: {
    type: Date,
    required: [true, "DoB of the user Required"],
  },
  address: {
    type: String,
    required: [true, "Address of the user Required"],
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  aadhaar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{4}\s\d{4}\s\d{4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Aadhaar number!`,
    },
  },
  pan: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid PAN number!`,
    },
  },
  vaccines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vaccines",
    },
  ],
});

userSchema.statics.login = async function (email, password, userType) {
  const user = await this.findOne({ email, userType });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  } else {
    throw Error("Sorry, Invalid user credentials");
  }
};
const userModel = new mongoose.model("users", userSchema);
module.exports = userModel;
