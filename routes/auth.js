const router = require("express").Router();
const authController = require("../controllers/authController");

// Registration
router.post('/register' , authController.createUser);

module.exports = router; 