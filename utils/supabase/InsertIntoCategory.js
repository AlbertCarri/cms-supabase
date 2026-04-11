import { createClient } from "../../app/lib/supabase/client";

export const InsertIntoCategory = async ({ userId, inputValue, restoId }) => {
  const supabase = createClient();
  console.log("Insert New category:", userId, inputValue, restoId);
  const { data: category, error } = await supabase
    .from("category")
    .insert([{ name: inputValue, user_id: userId, resto_id: restoId }]);

  if (error) console.error("Error de Consulta:", error);
};
