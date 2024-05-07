/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import nodemailer from "nodemailer";

const Sender_Email = process.env.Email;
const password = process.env.PASS;

const Host_Service = "smtp-relay.brevo.com";
const SMTP_Port = 587;

const CC = [];
const BCC = [];

const Email_Subject = "OTP Verification";

const transporter = nodemailer.createTransport({
  host: Host_Service,
  port: SMTP_Port,
  secure: false,
  auth: {
    user: Sender_Email,
    pass: password,
  },
});

export { transporter, Sender_Email, Email_Subject };
