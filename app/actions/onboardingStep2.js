"use server";

import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export async function onboardingStep2(prevData, formData) {
  const supabase = await createClient();
  const userUid = formData.get("user_uid");
  const logo = formData.get("logo");
  const banner = formData.get("banner");
  const palette = formData.get("palette");

  let logoUrl;
  let bannerUrl;

  if (logo && logo.size > 0) {
    const logoBuffer = Buffer.from(await logo.arrayBuffer());
    const logoFileName = `${userUid}-logo-${Date.now()}.${logo.name.split(".").pop()}`;

    const { error: logoError } = await supabase.storage
      .from("cms-Main")
      .upload(`public/${logoFileName}`, logoBuffer, {
        contentType: "image/webp",
        cacheControl: "3600",
        upsert: false,
      });

    if (logoError) console.error("Error en subida de logo", logoError);

    const { data: logoPublicUrl } = supabase.storage
      .from("cms-Main")
      .getPublicUrl(`public/${logoFileName}`);

    logoUrl = logoPublicUrl.publicUrl;
  }

  if (banner && banner.size > 0) {
    const bannerBuffer = Buffer.from(await banner.arrayBuffer());
    const bannerFileName = `${userUid}-banner-${Date.now()}`;

    const { error: bannerError } = await supabase.storage
      .from("cms-Main")
      .upload(`public/${bannerFileName}`, bannerBuffer, {
        contentType: "image/webp",
        cacheControl: "3600",
        upsert: false,
      });

    if (bannerError) console.error("Error al subir el banner", bannerError);

    const { data: bannerPublicUrl } = supabase.storage
      .from("cms-Main")
      .getPublicUrl(`public/${bannerFileName}`);

    bannerUrl = bannerPublicUrl.publicUrl;
  }
  const updateData = { palette: palette };
  if (logoUrl) updateData.logo = logoUrl;
  if (bannerUrl) updateData.banner = bannerUrl;

  if (Object.keys(updateData).length > 0) {
    const { error: dbError } = await supabase
      .from("users")
      .update(updateData)
      .eq("user_uid", userUid);

    if (dbError) console.error("ERROR AL ENVIAR LAS IMAGENES:", dbError);
  }
  redirect("/main");
}
