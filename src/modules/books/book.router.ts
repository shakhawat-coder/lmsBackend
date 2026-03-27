import { Router } from "express";
import { BookController } from "./book.controller";
import { upload } from "../../app/config/multer.config";

const router = Router();

router.post("/", upload.single("coverImage"), BookController.createBook);
router.get("/", BookController.getAllBooks);
router.get("/:id", BookController.getSingleBook);
router.patch("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

export const bookRouter = router;
