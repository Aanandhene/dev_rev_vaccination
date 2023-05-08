const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Location name Required"],
  },
  fromTime: {
    type: String,
    required: true,
  },
  toTime: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: [true, "Loaction Address"],
  },
  city: {
    type: String,
    required: [true, "City Required"],
  },
});

const locationModel = new mongoose.model("location", locationSchema);
module.exports = locationModel;
