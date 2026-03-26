import axios from "axios";

// Environment variables should typically store these
const STORE_ID = process.env.SSLCOMMERZ_STORE_ID || "testbox";
const STORE_PASSWORD = process.env.SSLCOMMERZ_STORE_PASSWORD || "qwerty";
const IS_LIVE = false; // set to true for production

export const initiateSSLCommerzPayment = async (paymentData: {
  total_amount: number;
  currency: string;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url: string;
  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_city: string;
  cus_postcode: string;
  cus_country: string;
  cus_phone: string;
  product_name: string;
  product_category: string;
  product_profile: string;
}) => {
  const data = {
    store_id: STORE_ID,
    store_passwd: STORE_PASSWORD,
    ...paymentData,
    shipping_method: "NO",
    num_of_item: 1,
    weight_of_item: "0",
    value_a: "ref_1",
    value_b: "ref_2",
    value_c: "ref_3",
    value_d: "ref_4",
  };

  const apiBaseUri = IS_LIVE
    ? "https://securepay.sslcommerz.com"
    : "https://sandbox.sslcommerz.com";

  try {
    const response = await axios({
      method: "POST",
      url: `${apiBaseUri}/gwprocess/v4/api.php`,
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    console.error("SSLCommerz Initialization Error:", error);
    throw new Error("Failed to initialize payment with SSLCommerz");
  }
};
