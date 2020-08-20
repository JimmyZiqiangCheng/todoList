const router = require("express").Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/register", validate, authController.register);
router.post("/login", validate, authController.login);
router.post("/verify", authenticateToken, authController.verify);

//login


module.exports = router;

