import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router(); 

router.post("/initiate", PaymentController.initiatePayment);
// SSLCommerz callbacks use POST
router.post("/success/:transactionId", PaymentController.paymentSuccess);
router.post("/fail/:transactionId", PaymentController.paymentFail);
router.post("/cancel/:transactionId", PaymentController.paymentCancel);

router.get("/", PaymentController.getAllPayments);

export const paymentRouter = router;
