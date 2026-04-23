import express from "express";
import connectDB from "./config/db.js";
import categoryRoutes from "./Category/category.routes.js";
import authRoutes from "./auth/auth.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Boro Bazar API Running");
});

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);

// Error Handler (must be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();