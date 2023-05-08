const { Router } = require("express");
const {
  addvaccinecenter,
  availableVaccines,
  changeActive,
} = require("../controller/logsController");
const { bookVaccine } = require("../controller/bookingLogsController");
const router = Router();

router.route("/addvaccinecenter").post(addvaccinecenter);
router.route("/availableVaccines").post(changeActive, availableVaccines);
router.route("/bookVaccine").post(bookVaccine);
module.exports = router;
