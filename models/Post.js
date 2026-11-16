const mongoose = require("mongoose");

// Define Blog Post Schema
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: 3,
            maxlength: 150
        },

        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true
        },

        authorName: {
            type: String,
            required: [true, "Author name is required"],
            trim: true
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        }
    },
    {
        timestamps: true
    }
);

// Create Model
const Post = mongoose.model("Post", postSchema);

// Export Model
module.exports = Post;