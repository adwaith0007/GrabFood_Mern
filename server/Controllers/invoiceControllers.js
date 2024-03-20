const express = require("express");
const router = express.Router();

const orderModel = require("../Models/order");
// const pdfDocument = require("pdfkit");
const fs = require('fs');
const handlebars = require('handlebars');
const pdf = require('html-pdf');
const path = require("path");

const pdfTemplate = require("../utils/Invoice");
const { log } = require("console");

// router.generateInvoice = async (req, res) => {
//   const { id } = req.params;

//   const order = await orderModel
//     .findOne({ _id: id })
//     .populate("products.productId");

//   const doc = new pdfDocument({ size: "A4", margin: 50 });
//   const buffers = [];
//   doc.on("data", buffers.push.bind(buffers));
//   doc.on("end", () => {
//     const pdfData = Buffer.concat(buffers);
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=invoice_${id}.pdf`
//     );
//     res.send(pdfData);
//   });

//   generateHeader(doc);
//   generateUserInfo(doc, order);
//   doc.end();
// };


router.generateInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order with the given orderId
    const order = await orderModel.findOne({ _id: orderId });

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const invoiceData = {
    name: order.userName,
    address: order.address[0].street, 
    city: order.address[0].city,
    state: order.address[0].state,
    zipCode: order.address[0].zipCode,
    phone: order.phone, 
    paymentMethod: order.paymentMethod, 
    orderDate: order.orderDate,
    products: order.products.map(product => ({
      productName: product.productName,
      price: product.price,
      quantity: product.quantity
    })),
    totalPrice: order.totalPrice,
    
    receiptId: order.razor_orderId
};

    const template = handlebars.compile(pdfTemplate(invoiceData));

    // Generate the invoice PDF using html-pdf
    pdf.create(template(invoiceData) , {}).toFile('invoice.pdf', (err, result) => {
      if (err) {
        console.error('Error generating PDF:', err);
        return res.status(500).json({ success: false, error: 'Error generating PDF' });
      }

      // Send the generated PDF file to the client
      res.sendFile(result.filename);
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ success: false, error: 'Error generating invoice' });
  }
};

module.exports = router;
