"use server";
import { supabase } from "@/lib/supabase/client";

export async function LoginAction(formData: FormData) {
  try {
    const email = (formData.get("email") || "").toString();
    const password = (formData.get("password") || "").toString();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, user: data.user };
  } catch (err) {
    console.error("LoginAction error:", err);
    return { success: false, message: "Something went wrong" };
  }
}




export async function SignupAction(formData: FormData) {
  try {
    const email = (formData.get("email") || "").toString();
    const password = (formData.get("password") || "").toString();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("email")) {
        return {
          success: false,
          errors: { email: [error.message] },
        };
      }

      return {
        success: false,
        errors: { root: [error.message] },
      };
    }

    return { success: true, user: data.user };
  } catch (err) {
    console.error("SignupAction error:", err);
    return {
      success: false,
      errors: { root: ["Something went wrong"] },
    };
  }
}
