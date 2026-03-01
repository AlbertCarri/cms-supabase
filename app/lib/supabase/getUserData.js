import { createClient } from "./service_role";

const supabase = createClient();

export async function getUserData(userId) {
  try {
    const {
      data: { user },
    } = await supabase.auth.admin.getUserById(userId);

    console.log("User email:", user.email);

    return user.email;
  } catch (error) {
    console.error("Error en la consulta de email del usuario", error);
  }
}
