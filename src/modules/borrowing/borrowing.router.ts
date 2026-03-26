import { Router } from "express";
import { BorrowingController } from "./borrowing.controller";

const router = Router();

router.post("/", BorrowingController.createBorrowing);
router.get("/", BorrowingController.getAllBorrowings);
router.get("/:id", BorrowingController.getSingleBorrowing);
router.patch("/:id/return", BorrowingController.returnBook);
router.patch("/:id", BorrowingController.updateBorrowing);
router.delete("/:id", BorrowingController.deleteBorrowing);

export const borrowingRouter = router;
