import { prisma } from "../../app/lib/prisma";
import { initiateSSLCommerzPayment } from "./payment.utils";
import crypto from "crypto";

const initiatePayment = async (data: {
  userId: string;
  membershipId?: string;
  amount: number;
  currency?: string;
}) => {
  // Generate a unique transaction ID
  const tran_id = `TXN_${crypto.randomBytes(8).toString("hex")}`;

  const user = await prisma.user.findUnique({
    where: { id: data.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Create payment record in UNPAID status
  const payment = await prisma.payment.create({
    data: {
      userId: data.userId,
      membershipId: data.membershipId,
      amount: data.amount,
      currency: data.currency || "BDT",
      transactionId: tran_id,
      status: "UNPAID",
    },
  });

  const backendUrl = process.env.BETTER_AUTH_URL || "http://localhost:5000";

  // Initialize SSLCommerz
  const sslData = {
    total_amount: payment.amount,
    currency: payment.currency,
    tran_id: payment.transactionId as string,
    success_url: `${backendUrl}/api/payments/success/${payment.transactionId}`,
    fail_url: `${backendUrl}/api/payments/fail/${payment.transactionId}`,
    cancel_url: `${backendUrl}/api/payments/cancel/${payment.transactionId}`,
    ipn_url: `${backendUrl}/api/payments/ipn`,
    cus_name: user.name || "Customer Name",
    cus_email: user.email || "customer@example.com",
    cus_add1: user.address || "Dhaka",
    cus_city: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: user.phoneNumber || "01700000000",
    product_name: data.membershipId ? "Membership Subscription" : "General Payment",
    product_category: "Service",
    product_profile: "general",
  };

  const response = await initiateSSLCommerzPayment(sslData);

  if (response?.status === "SUCCESS") {
    return { paymentUrl: response.GatewayPageURL };
  } else {
    throw new Error("Failed to generate payment url");
  }
};

const handleSuccess = async (transactionId: string) => {
  const result = await prisma.payment.update({
    where: { transactionId },
    data: {
      status: "PAID",
    },
  });
  return result;
};

const handleFail = async (transactionId: string) => {
  // Can either delete or just leave it UNPAID and mark failed
  return { transactionId, status: "FAILED" };
};

const handleCancel = async (transactionId: string) => {
  return { transactionId, status: "CANCELLED" };
};

const getAllPayments = async () => {
  return await prisma.payment.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      membership: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const PaymentService = {
  initiatePayment,
  handleSuccess,
  handleFail,
  handleCancel,
  getAllPayments,
};
