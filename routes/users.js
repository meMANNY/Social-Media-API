const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth");

// Get user profile
router.get("/:id", verifyToken, userController.getUser);

// Update user
router.put("/:id", verifyToken, userController.updateUser);

// Delete user
router.delete("/:id", verifyToken, userController.deleteUser);

// Follow user
router.put("/:id/follow", verifyToken, userController.followUser);

// Unfollow user
router.put("/:id/unfollow", verifyToken, userController.unfollowUser);

module.exports = router;