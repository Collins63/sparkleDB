const router  = require("express").Router();
const bookmarkController  = require("../controllers/bookmarkController");

//create Bookmarks
router.post("/" ,bookmarkController.createBookmark);
//delete Bookmarks
router.delete("/:id",bookmarkController.deleteController);
//get Bookmarks
router.get("/:userId", bookmarkController.getBoomarks);

module.exports  = router