const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

//health-check endpoint
app.route("/health").get( res.send('Works!'));

// POST route to send email
// POST route to send email
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer configuration (use environment variables in a production setup)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email details
    let mailOptions = {
        from: email,
        to: 'studiorangeen.art@gmail.com',  // Email where you want to receive the inquiries
        subject: 'New Inquiry from Contact Form',
        html: `
            <strong>You got an enquiry from your website:</strong><br><br>
            <strong>Name:</strong> ${name}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Message:</strong> ${message}<br><br>
            Thank you for reaching out!
        `
    };

    // Log mail options
    console.log(mailOptions); // Ensure this is here

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
