const validatePost = (req, res, next) => {

    const { title, content, authorName, category } = req.body;

    const errors = [];

    // Validate Title
    if (!title || typeof title !== "string" || !title.trim()) {
        errors.push("Title is required");
    } else if (title.trim().length < 3) {
        errors.push("Title must contain at least 3 characters");
    } else if (title.trim().length > 150) {
        errors.push("Title cannot exceed 150 characters");
    }

    // Validate Content
    if (!content || typeof content !== "string" || !content.trim()) {
        errors.push("Content is required");
    }

    // Validate Author Name
    if (!authorName || typeof authorName !== "string" || !authorName.trim()) {
        errors.push("Author name is required");
    }

    // Validate Category
    if (!category || typeof category !== "string" || !category.trim()) {
        errors.push("Category is required");
    }

    // Return Validation Errors
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    next();
};

module.exports = validatePost;