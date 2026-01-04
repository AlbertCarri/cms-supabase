"use client";

import { useState, useActionState } from "react";
import { updatePasswordAction } from "../../actions/auth";
import { Eye, EyeOff } from "lucide-react";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [state, updatePassword, isPending] = useActionState(
    updatePasswordAction,
    { message: "" }
  );

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 8;
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const isValid =
    hasLowerCase && hasUpperCase && hasNumber && hasMinLength && passwordsMatch;

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-4">
      <h1 className="text-2xl font-bold">Nueva contraseña</h1>
      <p className="text-sm text-gray-200">
        Ingresa tu nueva contraseña para tu cuenta.
      </p>

      <form className="flex flex-col gap-4">
        <div>
          <label className="text-md" htmlFor="password">
            Nueva contraseña
          </label>
          <div className="relative mt-2">
            <input
              className="rounded-md px-4 py-2 bg-inherit border w-full pr-10"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>

        {password && (
          <div className="space-y-1 text-sm">
            <ValidationItem isValid={hasMinLength} text="Mínimo 8 caracteres" />
            <ValidationItem isValid={hasUpperCase} text="Una mayúscula" />
            <ValidationItem isValid={hasLowerCase} text="Una minúscula" />
            <ValidationItem isValid={hasNumber} text="Un número" />
          </div>
        )}

        <div>
          <label className="text-md" htmlFor="confirmPassword">
            Confirmar contraseña
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border w-full mt-2"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {confirmPassword && (
          <p
            className={`text-sm ${
              passwordsMatch ? "text-green-600" : "text-red-600"
            }`}
          >
            {passwordsMatch
              ? "✓ Las contraseñas coinciden"
              : "✗ Las contraseñas no coinciden"}
          </p>
        )}

        <button
          formAction={updatePassword}
          className="button-purple rounded-md px-4 py-2 disabled:opacity-50"
          disabled={isPending || !isValid}
        >
          {isPending ? "Actualizando..." : "Actualizar contraseña"}
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

function ValidationItem({ isValid, text }) {
  return (
    <div
      className={`flex items-center gap-2 ${
        isValid ? "text-green-600" : "text-gray-400"
      }`}
    >
      <span>{isValid ? "✓" : "○"}</span>
      <span>{text}</span>
    </div>
  );
}
