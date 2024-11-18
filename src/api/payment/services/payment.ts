"use strict";

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "detox66a61e060bcb8";
const store_passwd = "detox66a61e060bcb8@ssl";
const is_live = false; // true for live, false for sandbox

module.exports = {
  async initTransaction(data) {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    try {
      const apiResponse = await sslcz.init(data);
      return apiResponse;
    } catch (error) {
      console.error("Error initiating transaction:", error);
      throw error;
    }
  },

  async sccess(data) {
    // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    // try {
    //   const apiResponse = await sslcz.init(data);
    //   return apiResponse;
    // } catch (error) {
    //   console.error("Error initiating transaction:", error);
    //   throw error;
    // }
  },

  async validateTransaction(val_id) {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    try {
      const response = await sslcz.validate({ val_id });
      return response;
    } catch (error) {
      console.error("Error validating transaction:", error);
      throw error;
    }
  },

  async initiateRefund(data) {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    try {
      const response = await sslcz.initiateRefund(data);
      return response;
    } catch (error) {
      console.error("Error initiating refund:", error);
      throw error;
    }
  },

  async refundQuery(refund_ref_id) {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    try {
      const response = await sslcz.refundQuery({ refund_ref_id });
      return response;
    } catch (error) {
      console.error("Error querying refund status:", error);
      throw error;
    }
  },

  async transactionQueryByTransactionId(tran_id) {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    try {
      const response = await sslcz.transactionQueryByTransactionId({ tran_id });
      return response;
    } catch (error) {
      console.error("Error querying transaction status:", error);
      throw error;
    }
  },

  async transactionQueryBySessionId(sessionkey) {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    try {
      const response = await sslcz.transactionQueryBySessionId({ sessionkey });
      return response;
    } catch (error) {
      console.error("Error querying transaction by session ID:", error);
      throw error;
    }
  },
};
