import { Router } from "express";
import { MembershipPlanController } from "./membership-plan.controller";

const router = Router();

router.post("/", MembershipPlanController.createMembershipPlan);
router.get("/", MembershipPlanController.getAllMembershipPlans);
router.get("/:id", MembershipPlanController.getSingleMembershipPlan);
router.patch("/:id", MembershipPlanController.updateMembershipPlan);
router.delete("/:id", MembershipPlanController.deleteMembershipPlan);

export const membershipPlanRouter = router;
