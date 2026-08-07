"use client";

import { useState, useEffect } from "react";
import { SelectEditMenu } from "../utils/supabase/EditMenu";
import { Pencil } from "lucide-react";
import imageCompression from "browser-image-compression";
import createEditMenu from "../app/actions/createEditMenu";

export const CreateEditModal = ({ closeModal, menuId, categoryId }) => {
  const [menu, setMenu] = useState([]);
  const [checkBox, setCheckedBox] = useState({
    gluten: false,
    crustaceos: false,
    huevo: false,
    pescado: false,
    leche: false,
    soja: false,
    mani: false,
    frutossecos: false,
  });
  const [suitableForDb, setSuitableForDb] = useState([]);
  const [menuImage, setMenuImage] = useState("/LogoMenu.jpg");
  const [menuImageFile, setMenuImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [imageChanged, setImageChanged] = useState("false");
  const [imageUrl, setImageUrl] = useState("");
  const suitableFor = ["Celíacos", "Veganos", "Vegetarianos", "Diabéticos"];
  const options = {
    maxSizeMB: 0.4,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.75,
  };

  useEffect(() => {
    const ReadMenus = async () => {
      const menus = await SelectEditMenu({ menuId });
      setMenu(menus);
      setMenuImage(menus[0].image);
      setImageUrl(menus[0].image);
      setCheckedBox({
        ...checkBox,
        gluten: menus[0].alergens.includes("gluten"),
        crustaceos: menus[0].alergens.includes("crustaceos"),
        huevo: menus[0].alergens.includes("huevo"),
        pescado: menus[0].alergens.includes("pescado"),
        leche: menus[0].alergens.includes("leche"),
        soja: menus[0].alergens.includes("soja"),
        mani: menus[0].alergens.includes("mani"),
        frutossecos: menus[0].alergens.includes("frutossecos"),
      });
      setSuitableForDb(menus[0]?.suitableFor || []);
    };
    if (menuId !== 0) {
      ReadMenus({ menuId });
      menuId = 0;
    }
  }, [menuId]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBlob = await imageCompression(file, options);
        const compressedFile = new File([compressedBlob], file.name, {
          type: compressedBlob.type,
          lastModified: Date.now(),
        });

        setMenuImageFile(compressedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setMenuImage(reader.result);
        };
        reader.readAsDataURL(compressedFile);
        setImageChanged("true");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.delete("file");
    formData.append("file", menuImageFile);
    const result = await createEditMenu({ menuId, categoryId, formData });
    if (result.success) return closeModal();
    setErrorMessage(Object.entries(result.error));
  };

  const handleSuitableChange = (item) => {
    setSuitableForDb((prev) =>
      prev.includes(item)
        ? prev.filter((check) => check !== item)
        : [...prev, item],
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal w-96" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col foreground-dark text-start">
            <input hidden name="imageChanged" value={imageChanged} readOnly />
            <input hidden name="imageUrl" defaultValue={imageUrl} />
            <label htmlFor="name" className="mb-1 font-bold">
              Nuevo Menú
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={menu && menu.length > 0 ? menu[0].name : ""}
              className="mb-4 p-2 bg-gray-300 rounded-lg"
            />

            <label htmlFor="description" className="mb-1 font-bold">
              Descripción
            </label>
            <input
              type="text"
              name="description"
              id="description"
              defaultValue={menu && menu.length > 0 ? menu[0].description : ""}
              className="mb-4 p-2 bg-gray-300 rounded-lg"
            />
            <p className="font-bold">Apto para:</p>
            <div className="flex flex-wrap mb-4">
              {suitableFor.map((item) => (
                <label key={item} htmlFor={item} className="mr-4">
                  {item}
                  <input
                    type="checkbox"
                    id={item}
                    name={item}
                    checked={suitableForDb.includes(item)}
                    onChange={() => handleSuitableChange(item)}
                    className="ml-1 accent-purple-600 cursor-pointer"
                  />
                </label>
              ))}
            </div>
            <p className="font-bold">Imagen</p>
            <div className="relative w-24 h-24">
              <label htmlFor="file" className="cursor-pointer">
                <img
                  src={menuImage}
                  width={100}
                  height={100}
                  alt="imagen"
                  className="rounded-lg"
                />
                <Pencil color="white" className="absolute right-2 top-1" />
              </label>
            </div>
            <input
              className="hidden mb-8"
              id="file"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
            <label htmlFor="price" className="mt-4 mb-1 font-bold">
              Precio en $(pesos)
            </label>
            <input
              type="text"
              name="price"
              id="price"
              defaultValue={menu && menu.length > 0 ? menu[0].price : ""}
              className="mb-4 p-2 bg-gray-300 rounded-lg"
            />

            <p className="mb-1 font-bold">Alergenos:</p>
            <div className="flex flex-row text-md justify-between">
              <label>
                <input
                  name="gluten"
                  type="checkbox"
                  checked={checkBox.gluten}
                  onChange={() =>
                    setCheckedBox({ ...checkBox, gluten: !checkBox.gluten })
                  }
                  className="mb-2 p-2 bg-gray-300 rounded-lg"
                />
                Gluten
              </label>
              <label>
                <input
                  name="crustaceos"
                  type="checkbox"
                  checked={checkBox.crustaceos}
                  onChange={() =>
                    setCheckedBox({
                      ...checkBox,
                      crustaceos: !checkBox.crustaceos,
                    })
                  }
                  className="mb-2 p-2 bg-gray-300 rounded-lg"
                />
                Crustáceos
              </label>
              <label>
                <input
                  name="huevo"
                  type="checkbox"
                  checked={checkBox.huevo}
                  onChange={() =>
                    setCheckedBox({ ...checkBox, huevo: !checkBox.huevo })
                  }
                  className="mb-2 p-2 bg-gray-300 rounded-lg"
                />
                Huevo
              </label>
              <label>
                <input
                  type="checkbox"
                  name="pescado"
                  checked={checkBox.pescado}
                  onChange={() =>
                    setCheckedBox({ ...checkBox, pescado: !checkBox.pescado })
                  }
                  className="mb-2 p-2 bg-gray-300 rounded-lg"
                />
                Pescado
              </label>
            </div>
            <div className="flex flex-row text-md justify-between">
              <label>
                <input
                  type="checkbox"
                  name="leche"
                  checked={checkBox.leche}
                  onChange={() =>
                    setCheckedBox({ ...checkBox, leche: !checkBox.leche })
                  }
                  className="mb-2 p-2 bg-gray-300 rounded-lg"
                />
                Leche
              </label>
              <label>
                <input
                  type="checkbox"
                  name="soja"
                  checked={checkBox.soja}
                  onChange={() =>
                    setCheckedBox({ ...checkBox, soja: !checkBox.soja })
                  }
                  className="mb-2 p-2 bg-gray-300 rounded-lg"
                />
                Soja
              </label>
              <label>
                <input
                  type="checkbox"
                  name="mani"
                  checked={checkBox.mani}
                  onChange={() =>
                    setCheckedBox({ ...checkBox, mani: !checkBox.mani })
                  }
                  className="mb-2 p-2 bg-gray-300 rounded-lg"
                />
                Maní
              </label>
              <label>
                <input
                  type="checkbox"
                  name="frutossecos"
                  checked={checkBox.frutossecos}
                  onChange={() =>
                    setCheckedBox({
                      ...checkBox,
                      frutossecos: !checkBox.frutossecos,
                    })
                  }
                  className="mb-2 p-2 bg-gray-300 rounded-lg"
                />
                Frutos secos
              </label>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-4">
            <button type="submit" className="btn-sky px-6 rounded-lg mx-2 p-2">
              Aceptar
            </button>
            <button
              type="button"
              className="btn-zinc px-6 rounded-lg mx-2 p-2"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
          {errorMessage && (
            <div className="text-left mt-4 p-2 border border-black rounded-xl">
              {errorMessage.map((error) => (
                <p key={error[0]} className="text-md text-red-600">
                  {Array.isArray(error[1]) ? error[1].join(",") : error[1]}
                </p>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
