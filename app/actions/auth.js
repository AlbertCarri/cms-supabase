"use server";

import { signInUser, signUpUser, logOut } from "../lib/supabase/server";
import { redirect } from "next/navigation";

// Acción para registrar un usuario
export async function signupAction(prevData, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const data = await signUpUser(email, password);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Acción para logear un usuario
export async function loginAction(prevData, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await signInUser(email, password);
  } catch (error) {
    return { success: false, error: error.message };
  }
  redirect("/main");
}

export async function signOut() {
  try {
    await logOut();
  } catch (error) {
    console.error("Error en logout:", error);
    return { success: false, error: error.message };
  }

  redirect("/login");
}
