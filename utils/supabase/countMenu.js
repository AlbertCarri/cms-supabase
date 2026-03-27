import { createClient } from "../../app/lib/supabase/server";

export default async function countMenu(userId) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("menu")
    .select("id,name, category!inner(resto_id)")
    .eq("category.resto_id", userId);

  if (!data) {
    return false;
  }

  if (data.length <= 20) return false;
  return true;
}
