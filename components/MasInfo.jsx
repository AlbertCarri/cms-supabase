"use client";

import { CircleX } from "lucide-react";
import { motion } from "motion/react";

export default function MasInfo({
  closeMasInfo,
  adress,
  schedule,
  socialmedia,
}) {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const handleCloseMasInfo = () => {
    return closeMasInfo();
  };
  return (
    <div className="fixed flex top-0 left-0 right-0 bottom-0 justify-center items-center backdrop-blur">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <div className="flex flex-col w-80 h-fit bg-slate-300 text-black p-4 rounded-xl">
          <p className="text-lg my-4 text-center font-bold">Dirección:</p>
          <p className="text-center">{adress}</p>
          <p className="text-lg mt-8 text-center font-bold">Horarios:</p>
          <table className="text-xs font-light mt-4 border-separate border-y-spacing-2">
            <tbody>
              {days.map((day) => (
                <tr key={day} className="">
                  <td className="text-left font-light">{day} :</td>
                  <td className="text-left font-light">
                    {schedule[day].turnos.length !== 0
                      ? `${schedule[day].turnos[0].apertura} a ${schedule[day].turnos[0].cierre}`
                      : "Cerrado"}
                  </td>
                  <td className="text-left font-light">
                    {schedule[day].turnos.length > 1
                      ? `y ${schedule[day].turnos[1].apertura} a ${schedule[day].turnos[1].cierre}`
                      : "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8">
            {socialmedia.map((media) => (
              <div
                key={media.name + media.social}
                className="flex flex-row mt-2 gap-4 justify-center items-center"
              >
                <img src={`/${media.social}.png`} width={40} />
                <p>{media.name}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8">
            <button type="button" onClick={handleCloseMasInfo}>
              <CircleX size={50} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/*
   <div className="text-xs">
          <p>
            Domingo : {schedule.Domingo.activo ? "Abierto" : "Cerrado"}{" "}
            {schedule.Domingo.turnos.length !== 0
              ? `${schedule.Domingo.turnos[0].apertura}-${schedule.Domingo.turnos[0].cierre}`
              : "--"}
            {schedule.Domingo.turnos.length > 1
              ? `${schedule.Domingo.turnos[1].apertura}-${schedule.Domingo.turnos[1].cierre}`
              : "--"}
          </p>
          <p>
            Lunes : {schedule.Lunes.activo ? "Abierto" : "Cerrado"}
            {schedule.Lunes.turnos.length !== 0
              ? `${schedule.Lunes.turnos[0].apertura}-${schedule.Lunes.turnos[0].cierre}`
              : "--"}
            {schedule.Lunes.turnos.length > 1
              ? `${schedule.Lunes.turnos[1].apertura}-${schedule.Lunes.turnos[1].cierre}`
              : "--"}
          </p>
          <p>
            Martes : {schedule.Martes.activo ? "Abierto" : "Cerrado"}
            {schedule.Martes.turnos.length !== 0
              ? `${schedule.Martes.turnos[0].apertura}-${schedule.Martes.turnos[0].cierre}`
              : "--"}
            {schedule.Martes.turnos.length > 1
              ? `${schedule.Martes.turnos[1].apertura}-${schedule.Martes.turnos[1].cierre}`
              : "--"}
          </p>
          <p>
            Miércoles : {schedule.Miércoles.activo ? "Abierto" : "Cerrado"}
            {schedule.Miércoles.turnos.length !== 0
              ? `${schedule.Miércoles.turnos[0].apertura}-${schedule.Miércoles.turnos[0].cierre}`
              : "--"}
            {schedule.Miércoles.turnos.length > 1
              ? `${schedule.Miércoles.turnos[1].apertura}-${schedule.Miércoles.turnos[1].cierre}`
              : "--"}
          </p>
          <p>
            Jueves : {schedule.Jueves.activo ? "Abierto" : "Cerrado"}
            {schedule.Jueves.turnos.length !== 0
              ? `${schedule.Jueves.turnos[0].apertura}-${schedule.Jueves.turnos[0].cierre}`
              : "--"}
            {schedule.Jueves.turnos.length > 1
              ? `${schedule.Jueves.turnos[1].apertura}-${schedule.Jueves.turnos[1].cierre}`
              : "--"}
          </p>
          <p>
            Viernes : {schedule.Viernes.activo ? "Abierto" : "Cerrado"}
            {schedule.Viernes.turnos.length !== 0
              ? `${schedule.Viernes.turnos[0].apertura}-${schedule.Viernes.turnos[0].cierre}`
              : "--"}
            {schedule.Viernes.turnos.length > 1
              ? ` y ${schedule.Viernes.turnos[1].apertura}-${schedule.Viernes.turnos[1].cierre}`
              : "--"}
          </p>
          <p>
            Sábado : {schedule.Sábado.activo ? "Abierto" : "Cerrado"}
            {schedule.Sábado.turnos.length !== 0
              ? `${schedule.Sábado.turnos[0].apertura}-${schedule.Sábado.turnos[0].cierre}`
              : "--"}
            {schedule.Sábado.turnos.length > 1
              ? `${schedule.Sábado.turnos[1].apertura}-${schedule.Sábado.turnos[1].cierre}`
              : "--"}
          </p>
        </div>

        <div className="flex flex-col text-xs">
          {days.map((day) => (
            <p key={day} className="mt-2 text-balance">
              {day} : {schedule[day].activo ? "" : "Cerrado"}{" "}
              {schedule[day].turnos.length !== 0
                ? `${schedule[day].turnos[0].apertura} a ${schedule[day].turnos[0].cierre}`
                : "--"}
              {schedule[day].turnos.length > 1
                ? ` y ${schedule[day].turnos[1].apertura} a ${schedule[day].turnos[1].cierre}`
                : "--"}
            </p>
          ))}
        </div>
 */
