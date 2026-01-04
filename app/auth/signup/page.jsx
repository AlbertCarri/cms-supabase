"use client";

import Link from "next/link";
import { Eye, EyeOff, ChevronsLeft } from "lucide-react";
import { useActionState } from "react";
import { signupAction } from "../../actions/auth";
import { useState } from "react";

export default function SignUp({ searchParams }) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, signUp, isPending] = useActionState(signupAction, {
    error: "",
  });

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline foreground-light button-zinc hover:button-background-zinc-hover flex items-center group text-sm"
      >
        <ChevronsLeft /> Back
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2">
        <label className="text-md foreground-ligth" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <div className="flex flex-row items-center mb-4">
          <input
            id="password"
            className="rounded-md px-4 py-2 bg-inherit border mr-4"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
            title="La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? "Mostrar contraseña" : "Ocultar contraseña"
            }
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>
        <p className="mb-16">
          La contraseña debe tener al menos 8 caracteres, una mayúscula, una
          minúscula y un número.
        </p>
        <button
          formAction={signUp}
          className="button-purple rounded-md px-4 py-2 foreground-ligth mb-2"
          disabled={isPending}
        >
          {isPending ? "Creando...." : "Crear usuario"}
        </button>
        {isPending ? "SignUp..." : state.error}
        <p>Ingrese un mail existente para poder verificarlo</p>
      </form>
    </div>
  );
}
