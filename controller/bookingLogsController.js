const userModel = require("../models/users");
const vaccineModel = require("../models/vaccines");
const bookingModel = require("../models/bookingLogs");
const logsModel = require("../models/logs");

module.exports.bookVaccine = async (req, res) => {
  const { logsId, userId, bookDate } = req.body;

  const bookingDate = new Date(bookDate);
  try {
    const logDetails = await logsModel.findOne({ _id: logsId });
    if (logDetails) {
      if (
        bookingDate >= logDetails.fromDate &&
        bookingDate <= logDetails.toDate
      ) {
        const bookingCountForDate = await bookingModel.countDocuments({
          date: bookingDate,
          locationId: logDetails.locationId,
        });
        const userDetails = await userModel.findOne(
          {
            _id: userId,
          },
          { name: 1 }
        );
        if (bookingCountForDate <= 10 && userDetails) {
          const bookedDetails = await bookingModel.create({
            date: bookingDate,
            locationId: logDetails.locationId,
            vaccineId: logDetails.vaccineId,
            userId,
          });
          await logsModel.updateOne(
            { _id: logsId },
            {
              $inc: {
                currentStock: -1,
                bookedCount: +1,
              },
            }
          );
          await vaccineModel.updateOne(
            { _id: logDetails.vaccineId },
            {
              $inc: {
                vaccineBooked: +1,
              },
            }
          );
          await userModel.updateOne(
            { _id: userId },
            {
              $push: {
                vaccines: bookedDetails._id,
              },
            }
          );
          res.status(200).json({
            status: "success",
            message: "Vaccine Booked Successfully ",
          });
        } else {
          res.status(400).json({
            status: "failed",
            message: "Slots not available on requested date ",
          });
        }
      } else {
        res.status(400).json({
          status: "failed",
          message: "Requested Vaccine not available at requested date ",
        });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "Requested Vaccine not found ",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Vaccination Booked Failed due to : " + error.message,
    });
  }
};
