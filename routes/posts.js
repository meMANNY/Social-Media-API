const router = require("express").Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/auth");


router.post("/", verifyToken, postController.createPost);
router.get("/:id", verifyToken, postController.getPost);
router.put("/:id", verifyToken, postController.updatePost);
router.delete("/:id", verifyToken, postController.deletePost);
router.put("/:id/like", verifyToken, postController.likePost);
router.get("/timeline/all", verifyToken, postController.getTimelinePosts);

module.exports = router;
