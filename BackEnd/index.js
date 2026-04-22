import express from "express";
import connectDB from "./config/db.js";
import categoryRoutes from "./Category/category.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { userRouter } from "./User/user.routes.js";

connectDB();
const app = express();

// Middleware

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Boro Bazar API Running");
});

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

// User routes
app.use('/api', userRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
