import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies(); // ← AWAIT aquí

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Puede fallar si se llama desde un Server Component
          }
        },
      },
    }
  );
}

export async function signInUser(email, password) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function signUpUser(email, password) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getRestoName(user_uid) {
  const schedule = {
    Domingo: {
      activo: false,
      turnos: [],
    },
    Lunes: {
      activo: false,
      turnos: [],
    },
    Martes: {
      activo: false,
      turnos: [],
    },
    Miércoles: {
      activo: false,
      turnos: [],
    },
    Jueves: {
      activo: false,
      turnos: [],
    },
    Viernes: {
      activo: false,
      turnos: [],
    },
    Sábado: {
      activo: false,
      turnos: [],
    },
  };
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("resto_name")
    .eq("user_uid", user_uid);

  if (userError) {
    throw new Error(userError.message);
  }
  if (!userData || userData.length === 0) {
    const { data, error: insertError } = await supabase.from("users").insert([
      {
        resto_name: "Nada cargado",
        user_uid: user_uid,
        schedule: schedule,
        type: "Cafetería",
        adress: "Avenida Siempre Viva 1234",
        socialmedia: [],
        qr_url: "",
      },
    ]);
    if (insertError) {
      console.error("ERROR AL INSERTAR:", insertError);
      throw new Error(insertError.message);
    }
    console.log("INSERTADO:", data);
    return null;
  } else {
    return userData[0].resto_name;
  }
}
