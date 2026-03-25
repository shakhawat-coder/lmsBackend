import { Request, Response } from "express";
import { UserService } from "./users.service";
import { apiError, apiResponse } from "../../app/utils/apiResponse";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsers();
    apiResponse(res, 200, "Users fetched successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to fetch users", err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserService.updateUser(id as string, req.body);
    apiResponse(res, 200, "User updated successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to update user", err);
  }
};

const softDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserService.softDeleteUser(id as string);
    apiResponse(res, 200, "User soft-deleted successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to soft-delete user", err);
  }
};

export const UserController = {
  getAllUsers,
  updateUser,
  softDeleteUser,
};
