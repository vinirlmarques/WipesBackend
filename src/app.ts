import express, { Application } from "express";
import cors from "cors";
import serverRoutes from "./routes/serverRoutes";
import { setupSwagger } from "./swagger";

const app: Application = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Setup Swagger documentation
setupSwagger(app);

// Routes
app.use("/api/servers", serverRoutes);

// Basic health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
