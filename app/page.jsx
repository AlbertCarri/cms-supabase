'use server'

import { createClient } from "../utils/supabase/server";
import { ClientButton } from "../components/ClientButton";
import { redirect } from "next/navigation";



export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient()
      return true;
    } catch (e) {
      return false;
    }
  }

  function redirection() {
    return redirect('/login')
  }
  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-9/12 flex flex-col gap-10 items-start">
      <div className="w-full border-t border-zinc-500 p-2 flex justify-center text-center text-xs mt-2"></div>
      <h2>
        Bienvenido a SuResto
      </h2>
      <h2>
        Cargue y gestione su menú digital para ser visto con QR desde cualquier dispositivo
      </h2>
      <div className="w-full flex justify-center items-center p-3 text-sm">
        {isSupabaseConnected &&
          <>
            <ClientButton>Comenzar</ClientButton>
          </>}
      </div>

      <footer className="w-full border-t border-zinc-500 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
