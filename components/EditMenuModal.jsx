"use client";

import { useEffect, useState } from "react";
import { SelectEditMenu } from "../utils/supabase/EditMenu";
import { UpdateMenu } from "../utils/supabase/UpdateMenu"; // 👈 Cambio: Update en vez de Insert
import { createClient } from "../app/lib/supabase/client";

export const EditMenuModal = ({ closeEditModal, menuId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para cada campo del formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  // Estados para alérgenos
  const [allergens, setAllergens] = useState({
    gluten: false,
    crustaceos: false,
    huevo: false,
    pescado: false,
    leche: false,
    soja: false,
    mani: false,
    frutossecos: false,
  });

  // 👇 Cargar datos del menú solo una vez al montar
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const menuData = await SelectEditMenu({ menuId });

        if (menuData && menuData.length > 0) {
          const menu = menuData[0];

          // Cargar datos en los estados
          setName(menu.name || "");
          setDescription(menu.description || "");
          setPrice(menu.price || "");
          setCurrentImageUrl(menu.image || "");
          setImagePreview(menu.image || "");

          // Cargar alérgenos (si los tienes guardados en la BD)
          if (menu.alergens) {
            setAllergens({
              gluten: menu.alergens.gluten || false,
              crustaceos: menu.alergens.crustaceos || false,
              huevo: menu.alergens.huevo || false,
              pescado: menu.alergens.pescado || false,
              leche: menu.alergens.leche || false,
              soja: menu.alergens.soja || false,
              mani: menu.alergens.mani || false,
              frutossecos: menu.alergens.frutossecos || false,
            });
          }
        }
      } catch (error) {
        console.error("Error cargando menú:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenu();
  }, [menuId]); // 👈 Solo se ejecuta cuando cambia menuId

  // Manejar cambio de alérgeno
  const handleAllergenChange = (allergen) => {
    setAllergens((prev) => ({
      ...prev,
      [allergen]: !prev[allergen],
    }));
  };

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Crear preview local
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      let finalImageUrl = currentImageUrl; // 👈 Usar URL actual por defecto

      // 👇 Solo subir imagen si hay una nueva
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${menuId}-${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("cms-Main")
          .upload(`public/${fileName}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Error al subir la imagen:", uploadError);
          alert("Error al subir la imagen");
          setIsSubmitting(false);
          return;
        }

        // Obtener URL pública
        const { data: urlData } = supabase.storage
          .from("cms-Main")
          .getPublicUrl(uploadData.path);

        finalImageUrl = urlData.publicUrl;
      }

      // 👇 Actualizar menú en la base de datos
      const { error: updateError } = await supabase
        .from("menu") // 👈 Nombre de tu tabla
        .update({
          name: name,
          description: description,
          price: price,
          image: finalImageUrl,
          alergens: allergens, // Guardar como JSON
          checked: checked,
        })
        .eq("id", menuId);

      if (updateError) {
        console.error("Error actualizando menú:", updateError);
        alert("Error al actualizar el menú");
      } else {
        console.log("Menú actualizado correctamente");
        closeEditModal(); // 👈 Cerrar modal después de éxito
      }
    } catch (error) {
      console.error("Error en el proceso:", error);
      alert("Ocurrió un error al guardar");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="modal-overlay">
        <div className="modal w-96 flex items-center justify-center">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={closeEditModal}>
      <div className="modal w-96" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col foreground-dark text-start">
            {/* Nombre */}
            <label htmlFor="name" className="mb-2">
              Nombre del platillo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // 👈 onChange
              className="mb-4 p-2 bg-gray-300 rounded-lg"
              required
            />

            {/* Descripción */}
            <label htmlFor="description" className="mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // 👈 onChange
              className="mb-4 p-2 bg-gray-300 rounded-lg"
              rows={3}
              required
            />

            {/* Preview de imagen actual */}
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg border"
                />
              </div>
            )}

            {/* Upload de imagen */}
            <label className="mb-2">
              Imagen del platillo {imageFile && "(Nueva imagen seleccionada)"}
            </label>
            <input
              className="mb-4"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/jpg" // 👈 Formato correcto
              onChange={handleFileChange} // 👈 onChange, NO value
            />

            {/* Precio */}
            <label htmlFor="price" className="mb-2">
              Precio en $ (pesos)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)} // 👈 onChange
              className="mb-4 p-2 bg-gray-300 rounded-lg"
              min="0"
              step="0.01"
              required
            />

            {/* Alérgenos */}
            <p className="mb-4 font-semibold">Alérgenos:</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.keys(allergens).map((allergen) => (
                <label
                  key={allergen}
                  className="flex items-center gap-2 capitalize"
                >
                  <input
                    type="checkbox"
                    checked={allergens[allergen]} // 👈 checked
                    onChange={() => handleAllergenChange(allergen)} // 👈 onChange
                    className="w-4 h-4"
                  />
                  {allergen.replace("frutossecos", "frutos secos")}
                </label>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-row justify-center gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-sky px-4 rounded-lg p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              type="button"
              className="button-zinc px-4 rounded-lg p-2"
              onClick={closeEditModal}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
