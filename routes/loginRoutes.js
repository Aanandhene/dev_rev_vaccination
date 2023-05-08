const { Router } = require("express");
const { loginUser } = require("../controller/loginController");
const router = Router();

router.route("/").post(loginUser);
module.exports = router;
