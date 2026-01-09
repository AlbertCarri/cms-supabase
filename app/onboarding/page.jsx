"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function Onboarding() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="flex flex-col w-11/12 md:w-1/2  bg-slate-800 mx-auto p-2 rounded-lg justify-center">
        <h1 className="text-5xl text-center mt-4"> Bienvenido a TuRestó</h1>
        <img
          src="/botcheff.png"
          alt="imagen de un robot cheff"
          width={200}
          className="mx-auto mt-8"
        />
        <div className="w-2/3 mx-auto">
          <p className="text-xl mt-14 text-left underline">
            Comencemos a configurar tu negocio
          </p>
          <p className="text-md mt-4">
            A continuación deberas completar toda la información que quieres que
            esté a disposición del cliente.
            <br />
            Por ahora solo son obligatorios 2 datos para que puedas comenzar a
            cargar tus menús.
            <br />
            <br />
            Los datos obligatorios son :
            <br />
            Nombre del emprendimiento:
            <br />
            Tipo de emprendimiento:
          </p>
        </div>
        <Link
          href={"/onboarding/step-1"}
          className="button-purple w-48 mx-auto p-2 mb-4 mt-14 rounded-md text-center"
        >
          Comencemos
        </Link>
      </div>
    </motion.div>
  );
}
