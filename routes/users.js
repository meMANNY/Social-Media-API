const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth");

router.get("/:id",verifyToken,userController.getUser);

router.put("/:id",verifyToken,userController.updateUser);

router.delete("/:id",verifyToken,userController.deleteUser);

router.put("/:id/follow",verifyToken,userController.followUser);

router.put("/:id/unfollow",verifyToken,userController.unfollowUser);

module.exports = router;
