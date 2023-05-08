const logModel = require("../models/logs");

module.exports.addvaccinecenter = async (req, res) => {
  const { locationId, fromDate, toDate, vaccineId, currentStock } = req.body;
  try {
    await logModel.create({
      locationId,
      fromDate,
      toDate,
      vaccineId,
      currentStock,
    });
    res.status(200).json({
      status: "success",
      message: "Vaccination Added to centre Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Vaccination Added to centre Failed due to : " + error.message,
    });
  }
};
module.exports.changeActive = async (req, res, next) => {
  const currentDate = new Date();
  const filter = { toDate: { $lt: currentDate }, isActive: true };
  const update = { $set: { isActive: false } };
  try {
    await logModel.updateMany(filter, update);
    next();
  } catch (error) {
    next();
  }
};
module.exports.availableVaccines = async (req, res) => {
  const { locationId } = req.body;
  try {
    const vaccines = await logModel
      .find({ locationId, isActive: true, currentStock : { $gt: 0 } })
      .populate({
        path: "vaccineId",
        select: "name",
      });
    res.status(200).json({
      status: "success",
      message: "Available vaccines data ",
      data: vaccines,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Vaccination Added to centre Failed due to : " + error.message,
    });
  }
};

