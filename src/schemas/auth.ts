import { email, string, z, ZodBoolean } from "zod";

export const LoginSchema = z.object({
    email : z.email("invalid email"),
    password : z.string().min(8, "password should be at least 8 chracters")
})

export type LoginInput = z.infer<typeof LoginSchema>


export const SignupSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email("Invalid email"),
    password: z.string().refine((val) => val.length >= 8 && val.length <= 20, {
      message: "Password must be between 8 to 20 characters",
    }),
    confirmPassword: z.string(),
    terms: z.coerce.boolean().refine((val) => val === true, {
      message: "please accept the terms and conditions first"
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export type SignupInput = z.infer<typeof SignupSchema>;
