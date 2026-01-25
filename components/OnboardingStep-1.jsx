"use client";

import { Plus } from "lucide-react";
import { useActionState, useState } from "react";
import { onboardingStep1 } from "../app/actions/onboardingStep1";
import { motion } from "motion/react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { scheduleBase } from "../app/lib/scheduleStarter";

export default function OnboardingStep1({ datosIniciales }) {
  const profile = datosIniciales[0];
  const schedule = profile?.schedule || scheduleBase;
  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const [variasRedes, setVariasRedes] = useState(profile?.socialmedia || []);
  const [emprendimiento, setEmprendimiento] = useState(
    profile?.resto_name || "Ingrese el nombre del emprendimiento",
  );
  const [tipo, setTipo] = useState(
    profile?.type || "Tipo de emprendimiendo. Ej: Cafetería",
  );
  const [direccion, setDireccion] = useState(
    profile?.adress || "Ingrese la dirección de su negocio",
  );
  const [state, sendingStep1, isPending] = useActionState(onboardingStep1, "");

  const selectedSocialMedia = (social) => {
    if (social === "") return;
    setVariasRedes((prev) => [
      ...prev,
      { social: social, name: "Ingrese el nombre" },
    ]);
  };

  const deleteSocialMedia = (id) => {
    setVariasRedes((prev) => prev.filter((social, i) => i !== id));
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
      <div className="w-11/12 md:w-2/3 bg-slate-800 mx-auto p-8 rounded-lg">
        <form action={sendingStep1} className="flex flex-col p-4">
          <input type="hidden" name="user_uid" value={profile?.user_uid} />
          <input
            type="hidden"
            name="socialmedia"
            value={JSON.stringify(variasRedes)}
          />
          <label htmlFor="emprendimiento" className="p-2">
            Nombre del emprendimiento:
          </label>
          <input
            className="text-black p-2 rounded-md"
            id="emprendimiento"
            type="text"
            name="emprendimiento"
            onChange={(e) => setEmprendimiento(e.target.value)}
            value={emprendimiento}
            required
          />
          <label htmlFor="tipo" className="p-2 mt-8">
            Tipo de emprendimiento:
          </label>
          <input
            id="tipo"
            type="text"
            name="tipo"
            onChange={(e) => setTipo(e.target.value)}
            value={tipo}
            className="text-black p-2 rounded-md"
            required
          />
          <label htmlFor="direccion" className="p-2 mt-8">
            Ubicación:
            <span className="text-cyan-300 italic">
              {" "}
              (puedes completarlo después)
            </span>
          </label>
          <input
            className="text-black p-2 rounded-md"
            id="direccion"
            type="text"
            name="direccion"
            onChange={(e) => setDireccion(e.target.value)}
            value={direccion}
          />
          <p className="p-2 mt-8">
            Horarios:
            <span className="text-cyan-300 italic">
              {" "}
              (puedes completarlo después)
            </span>
          </p>
          {weekDays.map((day) => (
            <div key={day} className="flex flex-row w-2/3 mx-auto p-1">
              <div className="flex w-1/4 justify-between items-center px-4">
                <label htmlFor={day}>{day}</label>
                <input
                  id={day}
                  type="checkbox"
                  name={day}
                  defaultChecked={schedule[day].activo || false}
                />
              </div>
              <div className="flex w-3/4 text-black justify-center items-center px-1">
                <input
                  className="w-24 py-1 px-2 mr-2 rounded-md"
                  type="time"
                  name={`open${day}`}
                  defaultValue={schedule[day].turnos[0]?.apertura || ""}
                  placeholder="Apertura"
                />
                <input
                  className="w-24 py-1 px-2 rounded-md"
                  type="time"
                  name={`close${day}`}
                  defaultValue={schedule[day].turnos[0]?.cierre}
                  placeholder="Cierre"
                />
                <Plus color="white" />
                <input
                  className="w-24 py-1 px-2 mr-2 rounded-md"
                  type="time"
                  name={`open2${day}`}
                  defaultValue={schedule[day].turnos[1]?.apertura}
                  placeholder="Apertura"
                />
                <input
                  className="w-24 py-1 px-2 rounded-md"
                  type="time"
                  name={`close2${day}`}
                  defaultValue={schedule[day].turnos[1]?.cierre}
                  placeholder="Cierre"
                />
              </div>
            </div>
          ))}
          <div className="flex flex-col w-2/3 mt-8">
            <label htmlFor="redsocial">
              Seleccione una red social:{" "}
              <span className="text-cyan-300 italic">
                {" "}
                (puedes completarlo después)
              </span>
            </label>
            <select
              name="redsocial"
              id="redsocial"
              value=""
              className="py-2 px-2 mt-4 rounded-md text-black"
              onChange={(e) => selectedSocialMedia(e.target.value)}
            >
              <option value="">Elija su red social:</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Whatsapp">Whatsapp</option>
              <option value="TikTok">TikTok</option>
              <option value="Pagina web">Pagina Web</option>
              <option value="Otra">Otra</option>
            </select>
            {variasRedes.length > 0 &&
              variasRedes.map((item, i) => (
                <div
                  key={i}
                  className="flex w-2/3 mt-4 justify-between items-center"
                >
                  <label htmlFor={`social${i}`}>{item.social}:</label>
                  <input
                    id={`social${i}`}
                    name={`social${i}`}
                    onChange={(e) => {
                      setVariasRedes((prev) =>
                        prev.map((item, index) =>
                          i === index
                            ? { ...item, name: e.target.value }
                            : item,
                        ),
                      );
                    }}
                    value={item.name}
                    placeholder="Usuario, pagina o numero completo"
                    className="w-64 py-1 mx-2 text-black px-2 rounded-md"
                  />
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => deleteSocialMedia(i)}
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
          </div>
          <div className="flex items-center justify-center mt-14 gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="button-purple w-auto p-2 rounded-md"
            >
              {isPending ? "Guardando...." : "Guardar y continuar"}
            </button>
            <Link
              href={"/onboarding/step-2"}
              className="button-zinc w-auto px-4 py-2"
            >
              Imágenes y colores
            </Link>
            <Link href={"/main"} className="button-zinc w-auto px-4 py-2">
              Volver
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
