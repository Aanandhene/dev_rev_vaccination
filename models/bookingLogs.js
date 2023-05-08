const mongoose = require("mongoose");

const bookingLogsSchema = new mongoose.Schema({
  date: Date,
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "location",
  },
  vaccineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vaccines",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const bookingModel = new mongoose.model("bookingLogs", bookingLogsSchema);

module.exports = bookingModel;
