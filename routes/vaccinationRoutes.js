const { Router } = require("express");
const {
  newVaccine,
  editVaccine,
  getAllVaccines,
} = require("../controller/vaccinationController");
const router = Router();

router.route("/new").post(newVaccine);
router.route("/edit").post(editVaccine);
router.route("/getAll").get(getAllVaccines);

module.exports = router;
