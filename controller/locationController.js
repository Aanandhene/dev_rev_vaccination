const locationModel = require("../models/location");

module.exports.newLocation = async (req, res) => {
  const { centreName, fromTime, toTime, centreAddress, centreCity } = req.body;

  try {
    await locationModel.create({
      name: centreName,
      fromTime,
      toTime,
      address: centreAddress,
      city: centreCity,
    });
    res.status(201).json({
      status: "success",
      message: "Vaccination Centre Created Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Vaccination Centre Creation failed due to " + error.message,
    });
  }
};

module.exports.editLocation = async (req, res) => {
  const { centreId, centreName, fromTime, toTime, centreAddress, centreCity } =
    req.body;
  try {
    await locationModel.updateOne(
      { _id: centreId },
      {
        $set: {
          name: centreName,
          fromTime,
          toTime,
          address: centreAddress,
          city: centreCity,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Vaccination Centre Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Vaccination Centre Updation failed due to " + error.message,
    });
  }
};

module.exports.deleteLocation = async (req, res) => {
  const { centreId } = req.body;
  try {
    await locationModel.deleteOne({ _id: centreId });
    res.status(200).json({
      status: "success",
      message: "Vaccination Centre Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Vaccination Centre Deletion failed due to " + error.message,
    });
  }
};

module.exports.getAllLoc = async (req, res) => {
  try {
    const loc = await locationModel.find({}, { _id: 1, name: 1, city: 1 });
    res.status(200).json({
      status: "success",
      data: loc,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports.getCenters = async (req, res) => {
  try {
    const loc = await locationModel.find(
      { city: req.query.city },
      { _id: 1, name: 1, city: 1, fromTime: 1, toTime: 1 }
    );
    res.status(200).json({
      status: "success",
      data: loc,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
