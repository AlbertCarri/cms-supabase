import { createClient } from "../../app/lib/supabase/client";

export const updateCategoryName = async ({ categoryId, inputValue }) => {
  const supabase = createClient();

  const { data: category, error } = await supabase
    .from("category")
    .update({ name: inputValue })
    .eq("id", categoryId);

  if (error) console.error("Error de Consulta:", error);

  return category;
};
