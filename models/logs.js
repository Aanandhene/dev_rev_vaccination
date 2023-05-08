const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  fromDate: Date, //Vaccination Available Time
  toDate: Date,
  vaccineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vaccines",
  },
  currentStock: {
    type: Number, //Current stock in the location
  },
  bookedCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const logsModel = new mongoose.model("logs", logsSchema);
module.exports = logsModel;
