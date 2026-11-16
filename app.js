const express = require("express");
const cors = require("cors");

const postRoutes = require("./routes/postRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Blog REST API"
    });
});

// Blog API Routes
app.use("/api/posts", postRoutes);

// Handle Undefined Routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

// Global Error Handling
app.use(errorMiddleware);

module.exports = app;