"use server";

import { createClient } from "../../app/lib/supabase/server";
import { sanitizeRestoName } from "./sanitize";
import { restoNameSchema } from "./schema";

export async function changeName(restoName) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "No autenticado" };

    const cleanRestoName = sanitizeRestoName(restoName);

    const validated = restoNameSchema.safeParse({ restoName: cleanRestoName });

    if (!validated.success) return { error: "Error de validación" };

    const safeName = validated.data.restoName;

    const { error } = await supabase
      .from("users")
      .update({ resto_name: safeName })
      .eq("user_id", user.id);

    if (error) return { error: "Actualización de resto_name" };
    return { success: true };
  } catch (er) {
    return { error: "Error general en changeName" };
  }
}
