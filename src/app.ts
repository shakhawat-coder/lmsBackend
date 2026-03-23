import express, { Application, Request, Response } from "express";
import { auth } from "./app/lib/auth";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { IndexRoutes } from "./app/routes";

const app: Application = express();
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
app.use("/api/auth", toNodeHandler(auth));

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});
app.use("/api/v1", IndexRoutes);

export default app;