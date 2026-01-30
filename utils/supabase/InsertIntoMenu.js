import { createClient } from "../../app/lib/supabase/client";

export const InsertIntoMenu = async ({
  fileURL,
  formDataObject,
  categoryId,
  menu,
  suitableFor,
}) => {
  const supabase = createClient();
  const menues = menu;

  const alergens = new Array();
  if (formDataObject.gluten === "on") alergens.push("gluten");
  if (formDataObject.crustaceos === "on") alergens.push("crustaceos");
  if (formDataObject.huevo === "on") alergens.push("huevo");
  if (formDataObject.pescado === "on") alergens.push("pescado");
  if (formDataObject.leche === "on") alergens.push("leche");
  if (formDataObject.soja === "on") alergens.push("soja");
  if (formDataObject.mani === "on") alergens.push("mani");
  if (formDataObject.frutossecos === "on") alergens.push("frutossecos");

  const suitableForDataBase = suitableFor.filter(
    (suitable) => formDataObject[suitable],
  );

  if (menu.length > 0) {
    const { data: menu, error } = await supabase
      .from("menu")
      .update([
        {
          category_id: categoryId,
          name: formDataObject.name,
          description: formDataObject.description,
          image: fileURL.publicUrl,
          price: formDataObject.price,
          alergens: alergens,
          suitableFor: suitableForDataBase,
          suitableOption: suitableFor,
        },
      ])
      .eq("id", menues[0].id);
    if (error) console.error("Error de Consulta:", error);
  } else {
    const { data: menu, error } = await supabase.from("menu").insert([
      {
        category_id: categoryId,
        name: formDataObject.name,
        description: formDataObject.description,
        image: fileURL.publicUrl,
        price: formDataObject.price,
        alergens: alergens,
        suitableFor: suitableForDataBase,
        suitableOption: suitableFor,
      },
    ]);
    if (error) console.error("Error de Consulta:", error);
  }
};
