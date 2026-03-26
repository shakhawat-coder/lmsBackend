import { Request, Response } from "express";
import { MembershipService } from "./membership.service";
import { apiError, apiResponse } from "../../app/utils/apiResponse";

const createMembership = async (req: Request, res: Response) => {
  try {
    const result = await MembershipService.createMembership(req.body);
    apiResponse(res, 201, "Membership created successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to create membership", err);
  }
};

const getAllMemberships = async (req: Request, res: Response) => {
  try {
    const result = await MembershipService.getAllMemberships();
    apiResponse(res, 200, "Memberships fetched successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to fetch memberships", err);
  }
};

const getSingleMembership = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await MembershipService.getSingleMembership(id as string);
    if (!result) {
      return apiError(res, 404, "Membership not found");
    }
    apiResponse(res, 200, "Membership fetched successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to fetch membership", err);
  }
};

const getMembershipByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await MembershipService.getMembershipByUser(userId as string);
    apiResponse(res, 200, "User memberships fetched successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to fetch user memberships", err);
  }
};

const updateMembership = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await MembershipService.updateMembership(id as string, req.body);
    apiResponse(res, 200, "Membership updated successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to update membership", err);
  }
};

const deleteMembership = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await MembershipService.deleteMembership(id as string);
    apiResponse(res, 200, "Membership deleted successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to delete membership", err);
  }
};

export const MembershipController = {
  createMembership,
  getAllMemberships,
  getSingleMembership,
  getMembershipByUser,
  updateMembership,
  deleteMembership,
};
