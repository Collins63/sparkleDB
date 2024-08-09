const router  = require("express").Router;
const userController = require("../controllers/userController")

//update User
router.put("/:id" , verifyAndAuthorization , userController.updateUser);

module.exports = router