"use client";

import { FileInput, Pencil } from "lucide-react";
import { useState } from "react";
import { onboardingStep2 } from "../app/actions/onboardingStep2";
import { motion } from "motion/react";
import Link from "next/link";
import { palettes } from "../app/lib/palettes";
import imageCompression from "browser-image-compression";
import PaletteSelect from "./PaletteSelect";
import PreviewMenu from "./PreviewMenu";

export default function OnboardingStep2({ datosIniciales }) {
  const profile = datosIniciales[0];
  const [logoImage, setLogoImage] = useState(profile.logo || null);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerImage, setBannerImage] = useState(profile.banner || null);
  const [bannerFile, setBannerFile] = useState(null);
  const [selectedPalette, setSelectedPalette] = useState(profile.palette || 1);
  const [isPending, setIsPending] = useState(false);
  const options = {
    maxSizeMB: 0.4,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.75,
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, options);
        setLogoFile(compressedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoImage(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleBannerChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, options);
        setBannerFile(compressedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerImage(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const selectPalette = (id) => {
    setSelectedPalette(id);
  };

  const handleSubmit = async (e) => {
    setIsPending(true);
    const formData = new FormData();
    formData.append("user_uid", profile.user_uid);
    formData.append("logo", logoFile);
    formData.append("banner", bannerFile);
    formData.append("palette", selectedPalette);

    const result = await onboardingStep2(null, formData);
    setIsPending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="relative w-11/12 md:w-2/3 bg-slate-800 mx-auto p-8 rounded-lg">
        <form action={handleSubmit} className="flex flex-col p-4">
          <input type="hidden" name="user_uid" value={profile?.user_uid} />
          <label htmlFor="logo" className="p-2">
            <p className="mb-4 text-lg font-bold">Tu logo aqui</p>
            {logoImage ? (
              <div className="relative w-60 h-60 items-center justify-center rounded-lg bg-slate-200 overflow-hidden cursor-pointer">
                <Pencil className="right-2 top-2 absolute" />
                <img
                  src={logoImage}
                  alt="logo de la empresa"
                  className="h-60 w-60 object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col w-60 h-60 items-center justify-center pt-5 pb-6 bg-slate-200 border-gray-500 border-2 border-dashed rounded-md cursor-pointer">
                <p className="text-sm text-gray-500">
                  <FileInput className="inline" /> Cargue la imagen de su logo
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG (MAX. 400x400px)
                </p>
              </div>
            )}
            <input
              className="hidden text-black p-2 rounded-md"
              id="logo"
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleLogoChange}
            />
          </label>
          <label htmlFor="banner" className="p-2 mt-8">
            <p className="mb-4 text-lg font-bold">Tu banner aqui</p>
            {bannerImage ? (
              <div className="relative w-96 h-40 items-center justify-center bg-slate-200 rounded-md object-container overflow-hidden cursor-pointer">
                <Pencil className="absolute right-2 top-2" />
                <img
                  src={bannerImage}
                  alt="banner de la empresa"
                  className="w-96 h-40 object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col w-96 h-40 items-center justify-center pt-5 pb-6 bg-slate-200 border-gray-500 border-2 border-dashed rounded-md cursor-pointer">
                <p className="text-sm text-gray-500">
                  <FileInput className="inline" /> Cargue la imagen de su logo
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG (MAX. 400x400px)
                </p>
              </div>
            )}
            <input
              className="hidden text-black p-2 rounded-md"
              id="banner"
              type="file"
              name="banner"
              accept="image/*"
              onChange={handleBannerChange}
            />
          </label>
          <p className="mb-4 mt-8 text-lg font-bold">
            Elegí tu paleta de colores
          </p>
          <PaletteSelect
            palettes={palettes}
            selectedPalette={selectedPalette}
            selectPalette={selectPalette}
          />
          <div className="flex items-center justify-center mt-14 gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="button-purple w-auto p-2 rounded-md"
            >
              {isPending ? "Guardando...." : "Guardar y finalizar"}
            </button>
            <Link href={"/main"} className="button-zinc w-auto px-4 py-2">
              Volver
            </Link>
          </div>
        </form>
        <PreviewMenu
          palettes={palettes}
          selectedPalette={selectedPalette}
          bannerImage={bannerImage}
          logoImage={logoImage}
          restoName={profile.resto_name}
        />
      </div>
    </motion.div>
  );
}
