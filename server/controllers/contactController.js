import nodemailer from "nodemailer";

const recipient = "chavanlalit518@gmail.com";
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[character]));

export async function sendContactMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: "All contact fields are required." });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(503).json({
        success: false,
        message: "Email service is not configured. Add SMTP_USER and SMTP_PASS to server/.env.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ServiGo Contact Form" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: email.trim(),
      subject: `[ServiGo Contact] ${subject.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
      html: `
        <h2>New ServiGo contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject.trim())}</p>
        <hr />
        <p>${escapeHtml(message.trim()).replace(/\n/g, "<br />")}</p>
      `,
    });

    return res.json({ success: true, message: "Your message was sent successfully." });
  } catch (error) {
    return next(error);
  }
}
