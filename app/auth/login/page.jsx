"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signupAction, loginAction } from "../../actions/auth";
import { useState } from "react";
import { Eye, EyeOff, ChevronsLeft } from "lucide-react";

export default function Login({ searchParams }) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, signIn, isPending] = useActionState(
    loginAction,
    "Ingrese sus datos"
  );
  const [stateUp, signUp, isPendingUp] = useActionState(
    signupAction,
    "Ingrese sus datos"
  );
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline foreground-light button-zinc hover:button-background-zinc-hover flex items-center group text-sm"
      >
        <ChevronsLeft /> Back
      </Link>

      <form className="animate-in flex flex-col w-full justify-center gap-2">
        <label className="text-md foreground-ligth" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <div className="flex flex-row items-center mb-14">
          <input
            id="password"
            className="rounded-md px-4 py-2 bg-inherit border mr-2"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
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
        <button
          formAction={signIn}
          className="button-sky w-36 mx-auto rounded-md px-4 py-2 foreground-ligth mb-2"
          disabled={isPending}
        >
          {isPending ? "Iniciando...." : "Iniciar sesión"}
        </button>
        {isPending ? "Signing..." : state.error}
        <p className="text-center text-sm mt-4">
          <Link
            href="/auth/reset-password"
            className="text-pink-400 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </form>
      <div className="flex flex-row items-center mt-14">
        <p>No te registraste todavia?</p>
        <Link
          href={"/auth/signup"}
          className="w-36 mx-auto text-center button-purple rounded-md px-4 py-2 foreground-ligth mb-2"
        >
          Crear usuario
        </Link>
      </div>
    </div>
  );
}
