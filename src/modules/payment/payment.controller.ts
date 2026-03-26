import { Request, Response } from "express";
import { PaymentService } from "./payment.service";
import { apiError, apiResponse } from "../../app/utils/apiResponse";

const initiatePayment = async (req: Request, res: Response) => {
  try {
    const result = await PaymentService.initiatePayment(req.body);
    apiResponse(res, 200, "Payment initiated successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to initiate payment", err);
  }
};

const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    
    // Explicitly type casting to fix "string | string[]" error
    const tranIdString = Array.isArray(transactionId) ? transactionId[0] : transactionId;
    
    const result = await PaymentService.handleSuccess(tranIdString as string);
    
    // NOTE: For payment gateways like SSLCommerz, you might want to redirect the user to a frontend success page instead of sending JSON.
    // e.g. return res.redirect(`http://localhost:3000/payment/success`);
    apiResponse(res, 200, "Payment successful", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to handle payment success", err);
  }
};

const paymentFail = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    const tranIdString = Array.isArray(transactionId) ? transactionId[0] : transactionId;
    
    const result = await PaymentService.handleFail(tranIdString as string);
    
    // e.g. return res.redirect(`http://localhost:3000/payment/fail`);
    apiResponse(res, 200, "Payment failed", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to handle payment failure", err);
  }
};

const paymentCancel = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    const tranIdString = Array.isArray(transactionId) ? transactionId[0] : transactionId;
    
    const result = await PaymentService.handleCancel(tranIdString as string);
    
    // e.g. return res.redirect(`http://localhost:3000/payment/cancel`);
    apiResponse(res, 200, "Payment cancelled", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to handle payment cancellation", err);
  }
};

const getAllPayments = async (req: Request, res: Response) => {
  try {
    const result = await PaymentService.getAllPayments();
    apiResponse(res, 200, "Payments fetched successfully", result);
  } catch (err: any) {
    apiError(res, 500, err.message || "Failed to fetch payments", err);
  }
};

export const PaymentController = {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  getAllPayments,
};
