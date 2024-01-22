const nodemailer = require('nodemailer');
const Mailgen =require('mailgen');
const { param } = require('../Routes/userRoutes');

let nodeConfig = {
    host:"smtp.ethereal.email",
    port:587,
    secure:false, // true for 465,false for other ports
    auth:{
        // user:process.env.EMAIL, // generated ethereal user
        // pass:process.env.PASSWORD, // generated ethereal password
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