"use client";

import { getSuscriptionUrl } from "../app/actions/suscriptions";

export default function MonthSuscriptionButton({ email, userId }) {
  const handleSuscription = async () => {
    if (!userId) {
      alert("Debes iniciar sesión primero");
      return;
    }

    const url = await getSuscriptionUrl({ userId, email });
    window.location.href = url;
  };
  return (
    <div className="flex w-full justify-center">
    <button
      type="button"
      onClick={handleSuscription}
      className="button-purple p-2 rounded-lg mb-4"
    >
      Suscribirse al Plan Mensual
    </button>
    </div>
  );
}
