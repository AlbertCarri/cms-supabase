"use client";

import { Plus } from "lucide-react";
import { useActionState } from "react";
import { useState } from "react";
import { onboardingStep1 } from "../../actions/onboardingStep1";
import { motion } from "motion/react";

export default function Step1() {
  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const [variasRedes, setVariasRedes] = useState([]);
  const [state, sendingStep1, isPending] = useActionState(
    onboardingStep1,
    "hola"
  );

  const selectedSocialMedia = (selected) => {
    if (selected === "") return;
    setVariasRedes((prev) => [...prev, selected]);
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
          <label htmlFor="emprendimiento" className="p-2">
            Nombre del emprendimiento:
          </label>
          <input
            className="text-black p-2 rounded-md"
            id="emprendimiento"
            type="text"
            name="emprendimiento"
            placeholder="Nombre de tu emprendimiento"
            required
          />
          <label htmlFor="tipo" className="p-2 mt-8">
            Tipo de emprendimiento:
          </label>
          <input
            id="tipo"
            type="text"
            name="tipo"
            placeholder="Ej. Cafetería"
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
            placeholder="Ej. San Martín 1234"
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
                <input id={day} type="checkbox" name={day} />
              </div>
              <div className="flex w-3/4 text-black justify-center items-center px-1">
                <input
                  className="w-24 py-1 px-2 mr-2 rounded-md"
                  type="time"
                  name={`open${day}`}
                  placeholder="Apertura"
                />
                <input
                  className="w-24 py-1 px-2 rounded-md"
                  type="time"
                  name={`close${day}`}
                  placeholder="Cierre"
                />
                <Plus color="white" />
                <input
                  className="w-24 py-1 px-2 mr-2 rounded-md"
                  type="time"
                  name={`open2${day}`}
                  placeholder="Apertura"
                />
                <input
                  className="w-24 py-1 px-2 rounded-md"
                  type="time"
                  name={`close2${day}`}
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
              variasRedes.map((social, i) => (
                <div
                  key={i}
                  className="flex w-2/3 mt-4 justify-between items-center"
                >
                  <label htmlFor={`social${i}`}>{social}:</label>
                  <input
                    id={`social${i}`}
                    name={`social${i}`}
                    placeholder="Usuario, pagina o numero completo"
                    className="w-64 py-1 text-black px-2 rounded-md"
                  />
                </div>
              ))}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="button-purple w-48 mx-auto p-2 mt-14 rounded-md"
          >
            {isPending ? "Guardando...." : "Guardar y continuar"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
