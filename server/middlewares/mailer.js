const nodemailer = require('nodemailer');
const Mailgen =require('mailgen');
const { param } = require('../Routes/userRoutes');

let nodeConfig = {
   
  // gmail
  // service: 'gmail',
  // host:"smtp.gmail.com",
  // 
  
  host:"smtp.ethereal.email",
    port:587,
    secure:false, // true for 465,false for other ports
    auth:{
        // user:process.env.EMAIL, 
        // pass:process.env.PASSWORD, 
     
        user:'darron.brekke17@ethereal.email',
        pass:'yjZxHT3UVnsa8MN3sT'
    }

}

/* POST:http://localhost:5000/api/registerMail
@param:{
  "username" :"example123",
  "password" :"admin123",
  "text"     :"",
  "subject"  :""
} */

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen ({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

exports.registerMail = async (req, res) => {
    try {
      const { username, userEmail, text, subject } = req.body;

      // Body of the email
      const email = {
        body: {
          name: username,
          intro: text || 'Welcome to GrabFood! We are very excited to have you on board.',
          outro: 'Need help, or have questions? Just reply to this email; we would love to help.'
        }
      };
  
      const emailBody = MailGenerator.generate(email);
  
      const message = {
        // from: process.env.EMAIL,
        from : 'darron.brekke17@ethereal.email',
        to: userEmail,
        subject: subject || 'Signup Successful',
        html: emailBody
      };
  
      // Send mail
      await transporter.sendMail(message);
      
      return res.status(200).send({ msg: 'You should receive an email from us.' });
    } catch (error) {
      console.error('Error sending registration email:', error);
      return res.status(500).send({ error: 'Failed to send registration email.' });
    }
  };



// const nodemailer = require('nodemailer');
// const Mailgen = require('mailgen');

// let nodeConfig = {
//   // Gmail configuration
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// };

// // Create a Nodemailer transporter with TLS options
// let transporter = nodemailer.createTransport({
//   ...nodeConfig,
//   tls: {
//     rejectUnauthorized: false // Allows nodemailer to use TLS even if unauthorized
//   }
// });

// let MailGenerator = new Mailgen({
//   theme: "default",
//   product: {
//     name: "Mailgen",
//     link: 'https://mailgen.js/'
//   }
// });

// exports.registerMail = async (req, res) => {
//   try {
//     const { username, userEmail, text, subject } = req.body;

//     // Body of the email
//     const email = {
//       body: {
//         name: username,
//         intro: text || 'Welcome to GrabFood! We are very excited to have you on board.',
//         outro: 'Need help, or have questions? Just reply to this email; we would love to help.'
//       }
//     };

//     const emailBody = MailGenerator.generate(email);

//     const message = {
//       from: process.env.EMAIL,
//       to: userEmail,
//       subject: subject || 'Signup Successful',
//       html: emailBody
//     };

//     // Send mail
//     await transporter.sendMail(message);

//     return res.status(200).send({ msg: 'You should receive an email from us.' });
//   } catch (error) {
//     console.error('Error sending registration email:', error);
//     return res.status(500).send({ error: 'Failed to send registration email.' });
//   }
// };




// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'runmate88@gmail.com',
//     // pass: "ajtk gnyn mqfe avuz",
//     pass: process.env.PASSWORD,
//   },
// });

// exports.registerMail = async (req, res) => {
  
//     const { username, userEmail, text, subject } = req.body;
//   const userDetails = {
//     from: process.env.EMAIL, // sender address
//     to: userEmail, // list of receivers
//     subject: "Activate your account", // Subject line
//     html: `<b>Your activation link :- </b>`, // html body
//   };

//   transporter.sendMail(userDetails, (err, data) => {
//     if (err) {
//       console.log("errorr", err);
//     } else {
//       console.log("email sent successfully");
//     }
//   });
// };

