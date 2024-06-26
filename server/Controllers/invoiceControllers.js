// const express = require("express");
// const router = express.Router();

// const orderModel = require("../Models/order");
// // const pdfDocument = require("pdfkit");
// const fs = require('fs');
// const handlebars = require('handlebars');
// const pdf = require('html-pdf');
// const path = require("path");

// const pdfTemplate = require("../utils/Invoice");
// const { log } = require("console");

// // router.generateInvoice = async (req, res) => {
// //   const { id } = req.params;

// //   const order = await orderModel
// //     .findOne({ _id: id })
// //     .populate("products.productId");

// //   const doc = new pdfDocument({ size: "A4", margin: 50 });
// //   const buffers = [];
// //   doc.on("data", buffers.push.bind(buffers));
// //   doc.on("end", () => {
// //     const pdfData = Buffer.concat(buffers);
// //     res.setHeader("Content-Type", "application/pdf");
// //     res.setHeader(
// //       "Content-Disposition",
// //       `attachment; filename=invoice_${id}.pdf`
// //     );
// //     res.send(pdfData);
// //   });

// //   generateHeader(doc);
// //   generateUserInfo(doc, order);
// //   doc.end();
// // };


// router.generateInvoice = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     // Find the order with the given orderId
//     const order = await orderModel.findOne({ _id: orderId });

//     // Check if the order exists
//     if (!order) {
//       return res.status(404).json({ success: false, error: 'Order not found' });
//     }

//     const invoiceData = {
//     name: order.userName,
//     address: order.address[0].street, 
//     city: order.address[0].city,
//     state: order.address[0].state,
//     zipCode: order.address[0].zipCode,
//     phone: order.phone, 
//     paymentMethod: order.paymentMethod, 
//     orderDate: order.orderDate,
//     products: order.products.map(product => ({
//       productName: product.productName,
//       price: product.price,
//       quantity: product.quantity
//     })),
//     totalPrice: order.totalPrice,
    
//     receiptId: order.razor_orderId
// };

//     const template = handlebars.compile(pdfTemplate(invoiceData));

//     // Generate the invoice PDF using html-pdf
//     pdf.create(template(invoiceData) , {}).toFile('invoice.pdf', (err, result) => {
//       if (err) {
//         console.error('Error generating PDF:', err);
//         return res.status(500).json({ success: false, error: 'Error generating PDF' });
//       }

//       // Send the generated PDF file to the client
//       res.sendFile(result.filename);
//     });
//   } catch (error) {
//     console.error('Error generating invoice:', error);
//     res.status(500).json({ success: false, error: 'Error generating invoice' });
//   }
// };

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const orderModel = require("../Models/order");
// const fs = require('fs');
// const handlebars = require('handlebars');
// const PDFDocument = require("pdfkit");
// const path = require("path");
// const pdfTemplate = require("../utils/Invoice");

// router.generateInvoice = async (req, res) => {
//     try {
//         const { orderId } = req.params;

//         const order = await orderModel.findOne({ _id: orderId });

//         if (!order) {
//             return res.status(404).json({ success: false, error: 'Order not found' });
//         }

//         const invoiceData = {
//             name: order.userName,
//             address: order.address[0].street,
//             city: order.address[0].city,
//             state: order.address[0].state,
//             zipCode: order.address[0].zipCode,
//             phone: order.phone,
//             paymentMethod: order.paymentMethod,
//             orderDate: order.orderDate,
//             products: order.products.map(product => ({
//                 productName: product.productName,
//                 price: product.price,
//                 quantity: product.quantity
//             })),
//             totalPrice: order.totalPrice,
//             receiptId: order.razor_orderId
//         };

//         const template = handlebars.compile(pdfTemplate(invoiceData));

//         // Create a new PDF document
//         const doc = new PDFDocument();

//         // Pipe the PDF document to a file stream

//         // const pdfPath = pdfTemplate ;

//         const pdfPath = 'invoice.pdf';
//         const pdfStream = fs.createWriteStream(pdfPath);

//         // Set up the response headers for the PDF
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=invoice_${orderId}.pdf`);

//         // Generate the PDF content
//         doc.pipe(pdfStream);
//         doc.fontSize(12);
//         doc.text(template(invoiceData), { align: 'left' });
//         doc.end();

//         // Send the generated PDF file to the client
//         pdfStream.on('finish', () => {
//             res.sendFile(path.resolve(pdfPath));
//         });
//     } catch (error) {
//         console.error('Error generating invoice:', error);
//         res.status(500).json({ success: false, error: 'Error generating invoice' });
//     }
// };

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const orderModel = require("../Models/order");
// const handlebars = require('handlebars');
// const path = require("path");
// const puppeteer = require("puppeteer");
// const pdfTemplate = require("../utils/Invoice");

// router.generateInvoice = async (req, res) => {
//     try {
//         const { orderId } = req.params;

//         const order = await orderModel.findOne({ _id: orderId });

//         if (!order) {
//             return res.status(404).json({ success: false, error: 'Order not found' });
//         }

//         const invoiceData = {
//             name: order.userName,
//             address: order.address[0].street,
//             city: order.address[0].city,
//             state: order.address[0].state,
//             zipCode: order.address[0].zipCode,
//             phone: order.phone,
//             paymentMethod: order.paymentMethod,
//             orderDate: order.orderDate,
//             products: order.products.map(product => ({
//                 productName: product.productName,
//                 price: product.price,
//                 quantity: product.quantity,
//                 vat: product.vat || 0 // Assuming VAT is a property in your product
//             })),
//             totalPrice: order.totalPrice,
//             receiptId: order.razor_orderId
//         };

//         const template = handlebars.compile(pdfTemplate(invoiceData));
//         const htmlContent = template(invoiceData);

//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.setContent(htmlContent);

//         const pdfBuffer = await page.pdf({ format: 'A4' });

//         await browser.close();

//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=invoice_${orderId}.pdf`);
//         res.send(pdfBuffer);
//     } catch (error) {
//         console.error('Error generating invoice:', error);
//         res.status(500).json({ success: false, error: 'Error generating invoice' });
//     }
// };

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const orderModel = require("../Models/order");
// const handlebars = require('handlebars');
// const puppeteer = require("puppeteer");
// const pdfTemplate = require("../utils/Invoice");

// router.generateInvoice = async (req, res) => {
//     try {
//         const { orderId } = req.params;

//         // Find the order with the given orderId
//         const order = await orderModel.findOne({ _id: orderId });

//         // Check if the order exists
//         if (!order) {
//             return res.status(404).json({ success: false, error: 'Order not found' });
//         }

//         const invoiceData = {
//             name: order.userName,
//             address: order.address[0].street,
//             city: order.address[0].city,
//             state: order.address[0].state,
//             zipCode: order.address[0].zipCode,
//             phone: order.phone,
//             paymentMethod: order.paymentMethod,
//             orderDate: order.orderDate,
//             products: order.products.map(product => ({
//                 productName: product.productName,
//                 price: product.price,
//                 quantity: product.quantity
//             })),
//             totalPrice: order.totalPrice,
//             receiptId: order.razor_orderId
//         };

//         const template = handlebars.compile(pdfTemplate(invoiceData));
//         const htmlContent = template(invoiceData);

//         // Launch Puppeteer and create a new page
//         const browser = await puppeteer.launch({ headless: true });
//         const page = await browser.newPage();

//         // Set the content of the page to the compiled HTML
//         await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

//         // Generate the PDF from the page content
//         const pdfBuffer = await page.pdf({ format: 'A4' });

//         // Close the Puppeteer browser
//         await browser.close();

//         // Set response headers for PDF download
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=invoice_${orderId}.pdf`);

//         // Send the generated PDF as a response
//         res.send(pdfBuffer);
//     } catch (error) {
//         // Log any errors and return a 500 response
//         console.error('Error generating invoice:', error);
//         res.status(500).json({ success: false, error: 'Error generating invoice' });
//     }
// };

// module.exports = router;








const express = require("express");
const router = express.Router();
const orderModel = require("../Models/order");
const handlebars = require('handlebars');
const puppeteer = require("puppeteer");
const pdfTemplate = require("../utils/Invoice");

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
        const htmlContent = template(invoiceData);

        // Launch Puppeteer with necessary flags and increased timeout
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            timeout: 60000 // 60 seconds timeout
        });

        const page = await browser.newPage();

        // Set the content of the page to the compiled HTML
        await page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 60000 });

        // Generate the PDF from the page content
        const pdfBuffer = await page.pdf({ format: 'A4' });

        // Close the Puppeteer browser
        await browser.close();

        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice_${orderId}.pdf`);

        // Send the generated PDF as a response
        res.send(pdfBuffer);
    } catch (error) {
        // Log any errors and return a 500 response
        console.error('Error generating invoice:', error);
        res.status(500).json({ success: false, error: 'Error generating invoice' });
    }
};

module.exports = router;