import { email, z } from "zod";

export const LoginSchema = z.object({
    email : z.email("invalid email"),
    password : z.string().min(8, "password should be at least 8 chracters")
})

export type LoginInput = z.infer<typeof LoginSchema>
