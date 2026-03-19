import { CryptomusClient } from "cryptomus-js";

export const cryptomusClient = new CryptomusClient({
  merchantId: process.env.CRYPTOMUS_MERCHANT_UUID || "",
  paymentKey: process.env.CRYPTOMUS_API_KEY || "",
  payoutKey: process.env.CRYPTOMUS_API_KEY || "",
});
