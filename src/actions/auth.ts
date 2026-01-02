"use server"

import { LoginSchema } from "@/schemas/auth";
import { redirect } from "next/navigation";
import data from '@/db.json'

export async function LoginAction(formData: FormData) {
  const rowData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = LoginSchema.safeParse(rowData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const user = data.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }

  redirect("/");
  return { success: true };
}