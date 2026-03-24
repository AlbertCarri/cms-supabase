"use client";

import { getSuscriptionUrl } from "../app/actions/suscriptions";

export default function MonthSuscriptionButton({ userId }) {
  const handleSuscription = async (formData) => {
    if (!userId) {
      alert("Debes iniciar sesión primero");
      return;
    }
    const email = formData.get("email");
    const url = await getSuscriptionUrl({ userId, email });
    window.location.href = url;
  };
  return (
    <div className="w-full">
      <form
        action={handleSuscription}
        className="flex flex-col justify-center items-center"
      >
        <label htmlFor="email" className="lg:text-xl text-sm p-2">
          Ingresa el email de tu cuenta de Mercado Pago
        </label>
        <input
          id="email"
          type="text"
          name="email"
          placeholder="tuemail@email.com"
          className="w-9/12 mb-8 border border-black p-4 rounded-lg"
        />
        <button type="submit" className="w-9/12 bg-sky-600 p-2 rounded-lg mb-4">
          Suscribirse al Plan Mensual
        </button>
      </form>
    </div>
  );
}
