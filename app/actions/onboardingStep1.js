"use server";

import { createClient } from "../lib/supabase/server";

export async function onboardingStep1(prevData, formData) {
  const restoName = formData.get("emprendimiento");
  console.log("guardando el step1");
  const supabase = createClient();
}
