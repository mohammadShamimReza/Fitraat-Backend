"use strict";

const paymentService = require("../services/payment");
import { v4 as uuidv4 } from "uuid";

  const frontend_url = process.env.FRONTEND_URL;
  const backend_url = process.env.BACKEND_URL;

  module.exports = {
    // Initialize a transaction
    async init(ctx) {
      const {
        total_amount,
        currency,
        product_name,
        product_category,
        product_profile,
        cus_name,
        cus_email,
        cus_add1,
        cus_country,
        cus_phone,
        tran_id = uuidv4().toString(),
        userId,
      } = ctx.request.body;

      const data = {
        total_amount,
        currency,
        tran_id, // Unique transaction ID
        success_url: `${backend_url}/api/payment/success/${userId}`,
        fail_url: `${frontend_url}/payment/fail/${userId}`,
        cancel_url: `${frontend_url}/payment/cancel/${userId}`,
        ipn_url: `${frontend_url}/payment/ipn`,
        shipping_method: "Courier",
        product_name,
        product_category,
        product_profile,
        cus_name,
        cus_email,
        cus_add1,
        cus_add2: ctx.query.cus_add2 || "Dhaka",
        cus_city: ctx.query.cus_city || "Dhaka",
        cus_state: ctx.query.cus_state || "Dhaka",
        cus_postcode: ctx.query.cus_postcode || "1000",
        cus_country,
        cus_phone,
        cus_fax: ctx.query.cus_fax || "00000000000",
        ship_name: ctx.query.ship_name || "Customer Name",
        ship_add1: ctx.query.ship_add1 || "Dhaka",
        ship_add2: ctx.query.ship_add2 || "Dhaka",
        ship_city: ctx.query.ship_city || "Dhaka",
        ship_state: ctx.query.ship_state || "Dhaka",
        ship_postcode: ctx.query.ship_postcode || 1000,
        ship_country: ctx.query.ship_country || "Bangladesh",
      };

      try {
        const response = await paymentService.initTransaction(data);

        // ctx.redirect(response.GatewayPageURL);

        const result = await strapi.entityService.update(
          "plugin::users-permissions.user",
          userId,
          {
            data: { tran_id: tran_id },
          }
        );

        ctx.body = { url: response.GatewayPageURL, response: response };
      } catch (error) {
        console.error("Error initializing transaction:", error);
        ctx.badRequest("Unable to initialize transaction");
      }
    },

    async success(ctx) {
      const { userId } = ctx.request.params;
      console.log(userId);

      try {
        const result = await strapi.entityService.update(
          "plugin::users-permissions.user",
          userId,
          {
            data: { paid: true },
          }
        );
        console.log(result);
        if (result) {
          ctx.response.redirect(
            `${frontend_url}/payment/redirectSuccess/${userId}`
          );
        } else {
          ctx.response.redirect(`${frontend_url}/contant`);
        }
      } catch (error) {
        // console.error("Error validating transaction:", error);
        // ctx.badRequest("Transaction validation failed");
      }
    },

    // Validate a transaction
    async validate(ctx) {
      const { val_id } = ctx.query;
      try {
        const validationResponse = await paymentService.validateTransaction(
          val_id
        );
        ctx.send(validationResponse);
      } catch (error) {
        console.error("Error validating transaction:", error);
        ctx.badRequest("Transaction validation failed");
      }
    },

    // Initiate a refund
    async initiateRefund(ctx) {
      const { refund_amount, bank_tran_id, refe_id } = ctx.request.body;
      try {
        const refundResponse = await paymentService.initiateRefund({
          refund_amount,
          bank_tran_id,
          refe_id,
        });
        ctx.send(refundResponse);
      } catch (error) {
        console.error("Error initiating refund:", error);
        ctx.badRequest("Refund initiation failed");
      }
    },

    // Query the status of a refund
    async refundQuery(ctx) {
      const { refund_ref_id } = ctx.query;
      try {
        const queryResponse = await paymentService.refundQuery(refund_ref_id);
        ctx.send(queryResponse);
      } catch (error) {
        console.error("Error querying refund status:", error);
        ctx.badRequest("Refund query failed");
      }
    },

    // Query the status of a transaction by Transaction ID
    async transactionQueryByTransactionId(ctx) {
      const { tran_id } = ctx.query;
      try {
        const queryResponse =
          await paymentService.transactionQueryByTransactionId(tran_id);
        ctx.send(queryResponse);
      } catch (error) {
        console.error("Error querying transaction status:", error);
        ctx.badRequest("Transaction query failed");
      }
    },

    // Query the status of a transaction by Session ID
    async transactionQueryBySessionId(ctx) {
      const { sessionkey } = ctx.query;
      try {
        const queryResponse = await paymentService.transactionQueryBySessionId(
          sessionkey
        );
        ctx.send(queryResponse);
      } catch (error) {
        console.error("Error querying transaction by session ID:", error);
        ctx.badRequest("Transaction query by session ID failed");
      }
    },
  };
