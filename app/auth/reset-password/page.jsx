"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordResetAction } from "../../actions/auth";
import { ChevronsLeft } from "lucide-react";

export default function ResetPassword() {
  const [state, requestReset, isPending] = useActionState(
    requestPasswordResetAction,
    { message: "" }
  );

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/auth/login"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-sm flex items-center group"
      >
        <ChevronsLeft />
        Volver al login
      </Link>

      <form className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Restablecer contraseña</h1>
        <p className="text-sm text-gray-600">
          Ingresa tu email y te enviaremos un link para restablecer tu
          contraseña.
        </p>

        <div>
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border w-full mt-2"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
          />
        </div>

        <button
          formAction={requestReset}
          className="button-purple rounded-md px-4 py-2 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "Enviando..." : "Enviar link de recuperación"}
        </button>

        {state.message && (
          <p
            className={`text-sm text-center p-3 rounded-md ${
              state.error
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
