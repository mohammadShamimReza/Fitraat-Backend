"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/payment/init",
      handler: "payment.init",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/payment/success/:userId",
      handler: "payment.success",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/payment/validate",
      handler: "payment.validate",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/payment/initiate-refund",
      handler: "payment.initiateRefund",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/payment/refund-query",
      handler: "payment.refundQuery",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/payment/transaction-query-by-transaction-id",
      handler: "payment.transactionQueryByTransactionId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/payment/transaction-query-by-session-id",
      handler: "payment.transactionQueryBySessionId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
