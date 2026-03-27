import express, { Application, Request, Response } from "express";
import { auth } from "./app/lib/auth";
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import { IndexRoutes } from "./app/routes";

const app: Application = express();
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL as string,
      process.env.BETTER_AUTH_URL as string,
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/api/auth", (req, res, next) => {
  if (!req.headers.origin) {
    req.headers.origin = process.env.BETTER_AUTH_URL || "http://localhost:5000";
  }
  next();
}, toNodeHandler(auth));

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});
app.use("/api/v1", IndexRoutes);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err
  });
});

export default app;