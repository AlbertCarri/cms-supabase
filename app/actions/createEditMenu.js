"use server";

import { z } from "zod";
import { createClient } from "../lib/supabase/server";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre tiene que tener mas de 2 letras." })
    .max(50),
  description: z
    .string()
    .min(2)
    .max(200, { message: "La descripción es demasiado larga." }),
  price: z.coerce.number().positive().min(1),
});

const schemaNewImage = schema.extend({
  image: z
    .instanceof(File, { message: "Debes subir una imagen" })
    .refine((file) => file.size > 0, { message: "Recuerda subir una imagen" }),
});

export default async function createEditMenu({ menuId, categoryId, formData }) {
  const menuForm = Object.fromEntries(formData.entries());
  const imageChanged = menuForm.imageChanged === "true";
  console.log(
    "imageChanged: ",
    imageChanged,
    "imageChanged Form: ",
    menuForm.imageChanged,
  );
  let imageUrl = menuForm.imageUrl;
  const menuRaw = {
    name: menuForm.name,
    description: menuForm.description,
    image: menuForm.file,
    price: menuForm.price,
  };

  const activeSchema = imageChanged || menuId === 0 ? schemaNewImage : schema;
  const result = activeSchema.safeParse(menuRaw);
  if (!result.success) {
    console.error("ERROR DE ZOD: ", result.error);
    return {
      success: false,
      error: z.flattenError(result.error).fieldErrors,
    };
  }

  const { name, description, price, image } = result.data;

  const OPTIONS_ALERGENS = [
    "gluten",
    "crustaceos",
    "huevo",
    "pescado",
    "leche",
    "soja",
    "mani",
    "frutossecos",
  ];
  const alergens = OPTIONS_ALERGENS.filter(
    (options) => menuForm[options] === "on",
  );

  const OPTIONS_SUITABLE = [
    "Celíacos",
    "Veganos",
    "Vegetarianos",
    "Diabéticos",
  ];
  const suitableFor = OPTIONS_SUITABLE.filter(
    (options) => menuForm[options] === "on",
  );

  const supabase = await createClient();

  // Si menuId es 0 significa que es un menú nuevo, INSERT()

  if (menuId === 0) {
    const filePath = `public/${Date.now()}-${image.name}`;
    const { error: errorImage } = await supabase.storage
      .from("cms-Main")
      .upload(filePath, image);
    if (errorImage) {
      console.error("Error al subir la imagen", image);
      return {
        success: false,
        error: { Imagen: "Error al subir la imagen del menú." },
      };
    }

    const { data: fileURL } = supabase.storage
      .from("cms-Main")
      .getPublicUrl(filePath);
    imageUrl = fileURL.publicUrl;

    const { error } = await supabase.from("menu").insert([
      {
        category_id: categoryId,
        name: name,
        description: description,
        image: imageUrl,
        price: price,
        alergens: alergens,
        suitableFor: suitableFor,
        suitableOption: OPTIONS_SUITABLE,
      },
    ]);
    if (error) {
      console.error("Error de Consulta:", error);
      return {
        success: false,
        error: { Menu: "No se pudo crear el menú por fallas técnicas." },
      };
    }
    return { success: true };
  }

  // UPDATE a supabase, menuId es un número diferente de 0
  if (imageChanged) {
    const filePath = `public/${Date.now()}-${image.name}`;
    const { errorImage } = await supabase.storage
      .from("cms-Main")
      .upload(filePath, image);
    if (errorImage) {
      console.error("Error al subir la imagen", image);
      return {
        success: false,
        error: { Imagen: "No se pudo subir la imagen." },
      };
    }

    const { data: fileURL } = supabase.storage
      .from("cms-Main")
      .getPublicUrl(filePath);
    imageUrl = fileURL.publicUrl;
  }

  const { error } = await supabase
    .from("menu")
    .update([
      {
        category_id: categoryId,
        name: name,
        description: description,
        image: imageUrl,
        price: price,
        alergens: alergens,
        suitableFor: suitableFor,
        suitableOption: OPTIONS_SUITABLE,
      },
    ])
    .eq("id", menuId);
  if (error) {
    console.error("Error de Consulta:", error);
    return { success: false, error: { Menu: "No se pudo modificar el menú." } };
  }
  return { success: true };
}
