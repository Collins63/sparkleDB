const router  = require("express").Router();
const userController = require("../controllers/userController")
const {verifyAndAuthorization , verifyToken , verifyAndAdmin } = require("../middleware/verifyToken")

//update User

// using token  router.put("/:id" , verifyAndAuthorization , userController.updateUser);
router.put("/:id" , verifyAndAuthorization, userController.updateUser);

//get user
router.get('/:id', userController.getUser);

//delete user
router.delete("/:id",  userController.deleteUser);

//getAllUsers
router.get("/" , verifyAndAdmin , userController.getAllUsers)
  
module.exports = router