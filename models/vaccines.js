const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Vaccine name Required"],
  },
  dose: {
    type: Number,
    required: [true, "No of doses"],
  },
  interval: {
    type: Number,
    required: [true, "Interval in days"],
  },
  vaccineBooked: {
    type: Number,
    required: [true, "Stock Availability required"],
    default: 0,
  },
});

const vaccineModel = new mongoose.model("vaccines", vaccineSchema);

module.exports = vaccineModel;
