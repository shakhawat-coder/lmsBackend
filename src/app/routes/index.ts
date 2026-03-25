import { Router } from "express";
import { categoryRouter } from "../../modules/category/category.router";
import { bookRouter } from "../../modules/books/book.router";

const router = Router();

router.use("/category", categoryRouter);
router.use("/books", bookRouter);

export const IndexRoutes = router;