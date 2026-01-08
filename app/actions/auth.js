"use server";

import { signInUser, signUpUser, logOut } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

// Acción para registrar un usuario
export async function signupAction(prevData, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!passwordRegex.test(password)) {
    return { error: "La contraseña no cumple con los requisitos de seguridad" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return {
      error:
        "El usuario ya está registrado. Si no recibiste el email de confirmación revisa span o correo no deseado.",
    };
  }
  redirect("/auth/verify-email");
}

// Acción para logear un usuario
export async function loginAction(prevData, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

    const restoName = await signInUser(email, password);
    console.log("auth login:", restoName);
    if (restoName) {
      redirect("/main");
    } else {
      redirect("/onboarding/step-1");
    }
 
}

export async function signOut() {
  try {
    await logOut();
  } catch (error) {
    console.error("Error en logout:", error);
    return { success: false, error: error.message };
  }

  redirect("/auth/login");
}

export async function requestPasswordResetAction(prevState, formData) {
  const email = formData.get("email");

  if (!email) {
    return { error: true, message: "Por favor ingresa tu email" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/auth/update-password`,
  });

  if (error) {
    return { error: true, message: error.message };
  }

  return {
    error: false,
    message:
      "Si el email existe, recibirás un link de recuperación. Revisa tu bandeja de entrada.",
  };
}

export async function updatePasswordAction(prevState, formData) {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // Validaciones
  if (password !== confirmPassword) {
    return { error: true, message: "Las contraseñas no coinciden" };
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      error: true,
      message: "La contraseña no cumple con los requisitos de seguridad",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return { error: true, message: error.message };
  }

  redirect("/auth/login");
}
