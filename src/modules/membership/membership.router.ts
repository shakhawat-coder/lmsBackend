import { Router } from "express";
import { MembershipController } from "./membership.controller";

const router = Router();

router.post("/", MembershipController.createMembership);
router.get("/", MembershipController.getAllMemberships);
router.get("/user/:userId", MembershipController.getMembershipByUser);
router.get("/:id", MembershipController.getSingleMembership);
router.patch("/:id", MembershipController.updateMembership);
router.delete("/:id", MembershipController.deleteMembership);

export const membershipRouter = router;
