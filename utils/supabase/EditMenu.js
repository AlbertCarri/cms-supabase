import { createClient } from "../../app/lib/supabase/client";

export const SelectEditMenu = async ({ menuId }) => {
  const supabase = createClient();

  const { data: menu, error } = await supabase
    .from("menu")
    .select("id,name,image,description,price,alergens,checked")
    .eq("id", menuId);

  if (error) console.error("Error de Consulta:", error);
  return menu;
};
