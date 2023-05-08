const { Router } = require("express");
const {
  newLocation,
  editLocation,
  deleteLocation,
  getAllLoc,
  getCenters,
} = require("../controller/locationController");

const router = Router();

router.route("/new").post(newLocation);
router.route("/edit").post(editLocation);
router.route("/delete").delete(deleteLocation);
router.route("/getAll").get(getAllLoc);
router.route("/getCenters").get(getCenters);

module.exports = router;
