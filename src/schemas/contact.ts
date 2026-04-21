import { z } from "zod";

export const ContactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email("Invalid email"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{11}$/, "Phone number must be 11 digits"),
  message: z.string(),
});

export type ContactInput  = z.infer<typeof ContactSchema>