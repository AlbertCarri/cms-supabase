import { createClient } from "../app/lib/supabase/server";

export const RestoName = async ({ userId }) => {
  const supabase = await createClient();

  const { data: users, error } = await supabase
    .from("users")
    .select("resto_name")
    .eq("user_uid", userId);

  if (error) console.error("Error de Consulta:", error);

  if (users.length <= 0) {
    const { data: users, error } = await supabase
      .from("users")
      .insert([{ resto_name: "Nombre del negocio", user_uid: userId }]);
    if (error) {
      console.error("Error de Consulta:", error);
      return;
    }
  }
  const resto = users[0].resto_name;
  return (
    <>
      <h2 className="background-window w-48 sm:w-56 p-2 mr-10 rounded-lg">
        {resto}
      </h2>
    </>
  );
};
