const { Router } = require("express");
const {
  saveUser,
  editUser,
  removeUser,
  changeRole,
} = require("../controller/signupController");
const router = Router();

router.route("/create/user").post(saveUser);
router.route("/edit/user").post(editUser);
router.route("/delete/user").delete(removeUser);
router.route("/change/userrole").post(changeRole);
module.exports = router;
