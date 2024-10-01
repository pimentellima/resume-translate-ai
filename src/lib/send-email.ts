import nodemailer from "nodemailer";

export default async function sendEmail(
  emailAddress: string,
  subject: string,
  html: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: emailAddress,
    subject: subject,
    html
  });
}