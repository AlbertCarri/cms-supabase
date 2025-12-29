"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signupAction, loginAction } from "../actions/auth";

export default function Login({ searchParams }) {
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2">
        <label className="text-md foreground-ligth" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button
          formAction={signIn}
          className="button-sky rounded-md px-4 py-2 foreground-ligth mb-2"
          disabled={isPending}
        >
          Sign In
        </button>
        {isPending ? "Signing..." : state.error}
        <button
          formAction={signUp}
          className="button-purple rounded-md px-4 py-2 foreground-ligth mb-2"
          disabled={isPendingUp}
        >
          Sign Up
        </button>
        {isPendingUp ? "SignUp..." : stateUp.error}
        {searchParams?.message && (
          <p className="mt-4 p-4 foregroound-ligth text-center">
            {searchParams.message}
          </p>
        )}
        <h3 className="mt-8">
          Puedes crear una cuenta nueva y verificarla via email o utilizar una
          de prueba ya creada.
        </h3>
        <b>Email: wottan@live.com.ar</b>
        <b>Password: Vercel2024</b>
      </form>
    </div>
  );
}
