import Link from "next/link";

export default function VerifyEmail() {
  return (
    <div className="flex flex-col bg-slate-700 w-1/2 h-96 items-center justify-center my-auto rounded-xl px-20">
      <h1 className="text-4xl mb-8">Gracias por registrarte</h1>
      <p className="mb-8">Verifique su email para activar la cuenta. Si no ve ningún email en la bandeja de entrada puede estar en Span o correo no deseado</p>
      <p className="mb-8">Una vez verificada presione 'Iniciar sesión'.</p>
      <Link
        href={"/auth/login"}
        className="button-sky rounded-md px-4 py-2 foreground-ligth mb-2"
      >
        Login
      </Link>
    </div>
  );
}
