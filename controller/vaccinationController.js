const vaccineModel = require("../models/vaccines");

module.exports.newVaccine = async (req, res) => {
  const { name, dose, interval } = req.body;
  try {
    await vaccineModel.create({
      name,
      dose,
      interval,
    });
    res.status(201).json({
      status: "success",
      message: "New Vaacine Created Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Vaccine Creation failed due to : " + error.message,
    });
  }
};

module.exports.editVaccine = async (req, res) => {
  const { vacId, name, dose, interval } = req.body;
  try {
    await vaccineModel.updateOne(
      { _id: vacId },
      {
        $set: {
          name,
          dose,
          interval,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Vaacine Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Vaccine Updation failed due to : " + error.message,
    });
  }
};

module.exports.getAllVaccines = async (req, res) => {
  try {
    const vac = await vaccineModel.find({}, { _id: 1, name: 1});
    res.status(200).json({
      status: "success",
      data: vac,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
