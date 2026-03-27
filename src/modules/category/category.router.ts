import { Router } from "express";
import { CategoryController } from "./category.controller";
import { upload } from "../../app/config/multer.config";

const router = Router();

router.post("/", upload.single("image"), CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getSingleCategory);
router.patch("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export const categoryRouter = router;
