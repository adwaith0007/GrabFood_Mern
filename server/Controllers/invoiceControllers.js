const express = require("express");
const router = express.Router();
// const orderModel = require("../models/order");
// const pdfDocument = require("pdfkit");
const fs = require("fs");
const htmlPdf = require("html-pdf");
const path = require("path");

const pdfTemplate = require("../utils/Invoice");

router.generateInvoice = async (req, res) => {
  const { id } = req.params;

  // const order = await orderModel
  //   .findOne({ _id: id })
  //   .populate("products.productId");

  // const doc = new pdfDocument({ size: "A4", margin: 50 });
  // const buffers = [];
  // doc.on("data", buffers.push.bind(buffers));
  // doc.on("end", () => {
  //   const pdfData = Buffer.concat(buffers);
  //   res.setHeader("Content-Type", "application/pdf");
  //   res.setHeader(
  //     "Content-Disposition",
  //     `attachment; filename=invoice_${id}.pdf`
  //   );
  //   res.send(pdfData);
  // });

  // generateHeader(doc);
  // generateUserInfo(doc, order);
  // doc.end();
};

module.exports = router;
