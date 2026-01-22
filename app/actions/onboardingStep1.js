"use server";

import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export async function onboardingStep1(prevData, formData) {
  const formStep1 = Object.fromEntries(formData.entries());
  const socialMedia = JSON.parse(formStep1.socialmedia);
  const schedule = {
    Domingo: {
      activo: formStep1.Domingo === "on",
      turnos: [
        {
          apertura: formStep1.openDomingo || null,
          cierre: formStep1.closeDomingo || null,
        },
        {
          apertura: formStep1.open2Domingo || null,
          cierre: formStep1.close2Domingo || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    Lunes: {
      activo: formStep1.Lunes === "on",
      turnos: [
        {
          apertura: formStep1.openLunes || null,
          cierre: formStep1.closeLunes || null,
        },
        {
          apertura: formStep1.open2Lunes || null,
          cierre: formStep1.close2Lunes || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    Martes: {
      activo: formStep1.Martes === "on",
      turnos: [
        {
          apertura: formStep1.openMartes || null,
          cierre: formStep1.closeMartes || null,
        },
        {
          apertura: formStep1.open2Martes || null,
          cierre: formStep1.close2Martes || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    Miércoles: {
      activo: formStep1["Miércoles"] === "on",
      turnos: [
        {
          apertura: formStep1["openMiércoles"] || null,
          cierre: formStep1["closeMiércoles"] || null,
        },
        {
          apertura: formStep1["open2Miércoles"] || null,
          cierre: formStep1["close2Miércoles"] || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    Jueves: {
      activo: formStep1.Jueves === "on",
      turnos: [
        {
          apertura: formStep1.openJueves || null,
          cierre: formStep1.closeJueves || null,
        },
        {
          apertura: formStep1.open2Jueves || null,
          cierre: formStep1.close2Jueves || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    Viernes: {
      activo: formStep1.Viernes === "on",
      turnos: [
        {
          apertura: formStep1.openViernes || null,
          cierre: formStep1.closeViernes || null,
        },
        {
          apertura: formStep1.open2Viernes || null,
          cierre: formStep1.close2Viernes || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    Sábado: {
      activo: formStep1["Sábado"] === "on",
      turnos: [
        {
          apertura: formStep1["openSábado"] || null,
          cierre: formStep1["closeSábado"] || null,
        },
        {
          apertura: formStep1["open2Sábado"] || null,
          cierre: formStep1["close2Sábado"] || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
  };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      resto_name: formStep1.emprendimiento,
      type: formStep1.tipo,
      adress: formStep1.direccion,
      socialmedia: socialMedia,
      schedule: schedule,
    })
    .eq("user_uid", formStep1.user_uid);
  if (error) console.error("Error al insertar en bd:", error);
  redirect("/onboarding/step-2");
}
