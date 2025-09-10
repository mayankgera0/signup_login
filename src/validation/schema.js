import { z } from "zod";

// Requirements-driven patterns
const nameRegex = /^[A-Za-z\s]+$/; // alphabets + spaces
const usernameRegex = /^[A-Za-z0-9!@#$%^&*._-]+$/; // alnum + limited specials
const gmailRegex = /^[a-zA-Z0-9.]+@gmail\.com$/; // Gmail username rules + domain
const phoneE164 = /^\+[1-9]\d{1,14}$/; // E.164

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .regex(nameRegex, "Only alphabets and spaces are allowed"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(
        usernameRegex,
        "Alphanumeric with allowed special characters (! @ # $ % ^ & * . _ -) only"
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .regex(gmailRegex, "Use a valid Gmail address (letters, numbers, periods)"),
    phone: z
      .string()
      .min(1, "Phone is required")
      .regex(phoneE164, "Use E.164 format like +919876543210"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        usernameRegex,
        "Alphanumeric with allowed special characters (! @ # $ % ^ & * . _ -) only"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
    if (val.username && val.password && val.username === val.password) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password must not be the same as username",
      });
    }
  });

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .regex(usernameRegex, "Invalid username"),
  password: z.string().min(1, "Password is required"),
});
