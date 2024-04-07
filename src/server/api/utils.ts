import nodemailer from "nodemailer"
import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const saltRounds = 10; // Increase this for better security
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
export const verifyPassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
export const generateOTP = () => {
  // Generate a random 8-digit number
  const code = Math.floor(Math.random() * 90000000) + 10000000;
  return code.toString(); // Convert to string
}

export async function sendEmail(email: string, otpCode: string) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })
  
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code for user verification is: ${otpCode}`,
    };
  
    try {
      await transport.sendMail(mailOptions);
    } catch (err) {
      console.error("Error sending email:", err);
      // Handle email sending errors (optional)
    }
  }