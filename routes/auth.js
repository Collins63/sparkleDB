const router = require("express").Router();
const authController = require("../controllers/authController");
const {verifyAndAuthorization , verifyToken} = require("../middleware/verifyToken")

// Registration
router.post('/register' , authController.createUser);

//login
router.post('/login' ,authController.loginUser);

module.exports = router;  