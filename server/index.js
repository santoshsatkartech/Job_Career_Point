require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// create transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, qualification, interestedRole, message } =
      req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const mailOptions = {
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      subject: `New contact form submission — ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${
        email || 'N/A'
      }\nQualification: ${qualification || 'N/A'}\nInterested Role: ${
        interestedRole || 'N/A'
      }\n\nMessage:\n${message || 'N/A'}`,
      html: `<h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Qualification:</strong> ${qualification || 'N/A'}</p>
        <p><strong>Interested Role:</strong> ${interestedRole || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message || 'N/A'}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    return res.json({ ok: true, info });
  } catch (err) {
    console.error('Error sending contact email', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API listening on port ${PORT}`);
});
