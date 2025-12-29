import { createClient } from "../../app/lib/supabase/client";

export const InsertIntoCategory = async ({ userId, inputValue }) => {
  const supabase = createClient();

  const { data: category, error } = await supabase
    .from("category")
    .insert([{ name: inputValue, user_uid: userId }]);
  if (error) console.error("Error de Consulta:", error);
};
