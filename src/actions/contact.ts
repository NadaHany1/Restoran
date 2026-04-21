"use server"

import { supabase } from "@/lib/supabase/client"
import { ContactSchema, ContactInput } from "@/schemas/contact"

export async function ContactAction(formData: FormData, userId?: string) {
  const rowData = Object.fromEntries(formData.entries());
  // Validate the form data
  const result = ContactSchema.safeParse(rowData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }
  const validatedData: ContactInput = result.data;

  try {
    const { data, error } = await supabase.from("messages").insert({
      user_id: userId,
      email: validatedData.email,
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      phone: validatedData.phone,
      message: validatedData.message,
    });

    if (error) {
      console.error("Supabase error:", error);

      return {
        success: false,
        message: "Failed to save message",
      };
    }

    return {
      success: true,
      message: "Message saved successfully",
    };

  } catch (err) {
    console.error("Unexpected error:", err);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
