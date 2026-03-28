import { Router } from "express";
import { PaymentController } from "./payment.controller";

import { authMiddleware, authorizeRoles } from "../../app/middlewares/authMiddleware";
const router = Router(); 

router.post("/initiate", authMiddleware, PaymentController.initiatePayment);
// SSLCommerz callbacks use POST - these are usually triggered by SSLCommerz server
router.post("/success/:transactionId", PaymentController.paymentSuccess);
router.post("/fail/:transactionId", PaymentController.paymentFail);
router.post("/cancel/:transactionId", PaymentController.paymentCancel);

router.get("/", authMiddleware, authorizeRoles("ADMIN", "SUPERADMIN"), PaymentController.getAllPayments);

export const paymentRouter = router;
