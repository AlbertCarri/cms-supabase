"use server";

import { createClient } from "../lib/supabase/server";
import { cookies } from "next/headers";

function setAuthCookie(session) {
  if (!session || !session.access_token || !session.refresh_token) return;

  cookies().set("sb-access", session.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });

 // Falta implementar la api de refresh
  cookies().set("sb-refresh", session.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}
export async function signupAction(prevData, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) return { success: false, error: error.message };

  if (data.session) setAuthCookie(data.session);
  return { success: true, user: data.user };
}

export async function loginAction(prevData, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return { success: false, error: error.message };
  if (data.session) setAuthCookie(data.session);
  return { success: true, user: data.user };
}

export async function logOut() {
  const supabase = await createClient();
  await supabase.auth.logOut();
  cookies().set("sb-token", "", { maxAge: 0 });
}
