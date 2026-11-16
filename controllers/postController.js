const Post = require("../models/Post");

// ==========================================
// 1. CREATE A NEW BLOG POST
// ==========================================

const createPost = async (req, res, next) => {
    try {
        const { title, content, authorName, category } = req.body;

        const newPost = await Post.create({
            title,
            content,
            authorName,
            category
        });

        res.status(201).json({
            success: true,
            message: "Blog post created successfully",
            data: newPost
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// 2. GET ALL BLOG POSTS
// ==========================================

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// 3. GET A SINGLE BLOG POST
// ==========================================

const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }

        res.status(200).json({
            success: true,
            data: post
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// 4. UPDATE AN EXISTING BLOG POST
// ==========================================

const updatePost = async (req, res, next) => {
    try {
        const allowedFields = [
            "title",
            "content",
            "authorName",
            "category"
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update"
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog post updated successfully",
            data: updatedPost
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// 5. DELETE A BLOG POST
// ==========================================

const deletePost = async (req, res, next) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog post deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// EXPORT ALL CONTROLLERS
// ==========================================

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};