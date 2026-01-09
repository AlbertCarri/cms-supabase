"use server";

import { createClient } from "../lib/supabase/server";

export async function onboardingStep1(prevData, formData) {
  const formStep1 = Object.fromEntries(formData.entries());
  const schedule = {
    domingo: {
      activo: rawData.Domingo === "on",
      turnos: [
        {
          apertura: rawData.openDomingo || null,
          cierre: rawData.closeDomingo || null,
        },
        {
          apertura: rawData.open2Domingo || null,
          cierre: rawData.close2Domingo || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre), // Solo turnos completos
    },
    lunes: {
      activo: rawData.Lunes === "on",
      turnos: [
        {
          apertura: rawData.openLunes || null,
          cierre: rawData.closeLunes || null,
        },
        {
          apertura: rawData.open2Lunes || null,
          cierre: rawData.close2Lunes || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    martes: {
      activo: rawData.Martes === "on",
      turnos: [
        {
          apertura: rawData.openMartes || null,
          cierre: rawData.closeMartes || null,
        },
        {
          apertura: rawData.open2Martes || null,
          cierre: rawData.close2Martes || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    miércoles: {
      activo: rawData["Miércoles"] === "on",
      turnos: [
        {
          apertura: rawData["openMiércoles"] || null,
          cierre: rawData["closeMiércoles"] || null,
        },
        {
          apertura: rawData["open2Miércoles"] || null,
          cierre: rawData["close2Miércoles"] || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    jueves: {
      activo: rawData.Jueves === "on",
      turnos: [
        {
          apertura: rawData.openJueves || null,
          cierre: rawData.closeJueves || null,
        },
        {
          apertura: rawData.open2Jueves || null,
          cierre: rawData.close2Jueves || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    viernes: {
      activo: rawData.Viernes === "on",
      turnos: [
        {
          apertura: rawData.openViernes || null,
          cierre: rawData.closeViernes || null,
        },
        {
          apertura: rawData.open2Viernes || null,
          cierre: rawData.close2Viernes || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
    sábado: {
      activo: rawData["Sábado"] === "on",
      turnos: [
        {
          apertura: rawData["openSábado"] || null,
          cierre: rawData["closeSábado"] || null,
        },
        {
          apertura: rawData["open2Sábado"] || null,
          cierre: rawData["close2Sábado"] || null,
        },
      ].filter((turno) => turno.apertura && turno.cierre),
    },
  };
  console.log("Formulario:", schedule);
  const supabase = createClient();
}
