import { Router } from "express";
import { categoryRouter } from "../../modules/category/category.router";

const router = Router();

router.use("/category", categoryRouter);

export const IndexRoutes = router;