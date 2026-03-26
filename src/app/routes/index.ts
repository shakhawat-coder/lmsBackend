import { Router } from "express";
import { categoryRouter } from "../../modules/category/category.router";
import { bookRouter } from "../../modules/books/book.router";
import { UserRouter } from "../../modules/users/users.router";
import { borrowingRouter } from "../../modules/borrowing/borrowing.router";
import { membershipRouter } from "../../modules/membership/membership.router";
import { membershipPlanRouter } from "../../modules/membership-plan/membership-plan.router";

const router = Router();

router.use("/category", categoryRouter);
router.use("/books", bookRouter);
router.use("/users", UserRouter);
router.use("/borrowings", borrowingRouter);
router.use("/memberships", membershipRouter);
router.use("/membership-plans", membershipPlanRouter);

export const IndexRoutes = router;