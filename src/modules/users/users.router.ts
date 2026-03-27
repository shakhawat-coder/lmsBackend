import express from "express";
import { UserController } from "./users.controller";
import { authMiddleware, authorizeRoles } from "../../app/middlewares/authMiddleware";

const router = express.Router();

// All routes below require a valid session
router.use(authMiddleware);

// SUPERADMIN only: create a new admin
router.post(
  "/create-admin",
  authorizeRoles("SUPERADMIN"),
  UserController.createAdmin,
);

// ADMIN + SUPERADMIN: manage users
router.get("/", authorizeRoles("ADMIN", "SUPERADMIN"), UserController.getAllUsers);
router.patch("/:id", authorizeRoles("ADMIN", "SUPERADMIN"), UserController.updateUser);
router.delete("/:id", authorizeRoles("ADMIN", "SUPERADMIN"), UserController.softDeleteUser);

export const UserRouter = router;
