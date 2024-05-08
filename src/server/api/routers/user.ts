/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import { addMinutes } from "date-fns";
import { db } from "../../db";
import { Email_Subject, Sender_Email, transporter } from "../../Services/email";

const prisma = new PrismaClient();

export const SignupInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

async function hashPassword(pass: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
}

async function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  const len = digits.length;
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }
  return OTP;
}

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(SignupInputSchema)
    .query(async ({ ctx, input }) => {
      console.log("input", input);
      try {
        const existingUser = await db.user.findUnique({
          where: {
            email: input.email,
          },
        });
        console.log("existing user", existingUser);

        if (existingUser) {
          console.log("existing user");

          return "User already exists";
        }

        const otp = await generateOTP();
        ctx.otp = otp;
        ctx.currentUser = input;
        console.log("generated otp", otp);

        const options = {
          from: Sender_Email,
          to: input.email,
          cc: [],
          bcc: [],
          subject: Email_Subject,
          text: `<p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p><p>Please use this OTP to verify your identity.</p><p>Thank you.</p>`,
        };

        transporter.sendMail(options, (error, info) => {
          if (error) {
            console.log("Unable to send email", error);
          } else {
            // console.log("Email Send with Info", info);
          }
        });

        return "status ok";
      } catch (error) {
        console.log(error);
      }
    }),

  verify: publicProcedure
    .input(z.object({ otp: z.number() }))
    .mutation(async ({ ctx, input }) => {
      console.log("OTP input from server verify endpoint", input);

      console.log("from verify", ctx.otp);
      if (ctx.otp === input.otp) {
        const hashedPassword = await hashPassword(ctx.currentUser.password);
        // ctx["userExtend"]=existingUser;

        // console.log(hashedPassword);

        const newUser = await db.user.create({
          data: {
            name: ctx.currentUser.name,
            email: ctx.currentUser.email,
            password: hashedPassword,
          },
        });
        console.log("created user", newUser);
        console.log("Success");
        return "success";
      }
    }),
});

// .mutation('signup',{
//     input:schema =>({
//         email:schema.string().email().unique(),
//         password:schema.string().min(6),
//         firstName:schema.string(),
//         lastName:schema.string(),

//     }),async resolve({input}){
//         const hashedPassword=await hashPassword(input.password)
//     }
// })
