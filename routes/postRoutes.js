const express = require("express");

const router = express.Router();

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} = require("../controllers/postController");

const validatePost = require("../middleware/validationMiddleware");

// CREATE
router.post("/", validatePost, createPost);

// READ ALL
router.get("/", getAllPosts);

// READ SINGLE
router.get("/:id", getPostById);

// UPDATE
router.put("/:id", validatePost, updatePost);

// DELETE
router.delete("/:id", deletePost);

module.exports = router;