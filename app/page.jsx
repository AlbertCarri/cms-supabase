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
      <div className="w-full border-t border-zinc-500 p-2 flex justify-center text-center mt-4"></div>
      <p className="text-2xl">
        Bienvenido a SuResto:
      </p>
      <p className="text-xl">
        Moderniza tu restaurante o tienda de comidas con un menú dinámico y digital mientras ahorras en impresiones de menús.
      </p>
      <p className="text-sm">
        Optimiza la experiencia de tus clientes con nuestro software,
        que permite crear un menú accesible desde cualquier dispositivo móvil con lector de códigos QR. Con esta herramienta,
        podrás personalizar tu menú con el nombre de tu restaurante y organizarlo por categorías como pizzas,
        sándwiches, entre otros. Dentro de cada categoría, podrás añadir los platos correspondientes con su descripción, precio, foto y alergenos.

        Una vez configurado, el sistema generará un código QR único que podrás descargar
        e imprimir en el soporte de tu elección para ponerlo a disposición de tus clientes.
        Al escanearlo, tus clientes accederán al menú completo y actualizado en su dispositivo móvil.
        Además, si alguno de tus menús no está disponible temporalmente, podrás ocultarlo fácilmente desde la aplicación.

      </p>
      <div className="w-full flex justify-center items-center p-3 text-md">
        {isSupabaseConnected &&
          <>
            <ClientButton>Comenzar</ClientButton>
          </>}
      </div>
      <div className="w-full border-t border-zinc-500 p-8 flex justify-center text-center text-xs"></div>
      <footer className="w-full m-0 p-0">
        <div>
          <div className="flex flex-row text-center">
            <div className="basis-1/3">
            <b>Desarrollador:</b>
            <p>Alberto Carrizo</p>
            </div>
            <div className="basis-1/3">
            <b>React Framework:</b>
            <p>Hecho con NEXT.js</p>
            </div>
            <div className="basis-1/3 flex flex-row relative justify-center">
              <img src="/linkedin.png" alt="logo" width={24} height={24} className="absolute mr-20 object-scale-down"/>
              <a
              href="https://www.linkedin.com/in/alberto-edelmiro-carrizo-7639a186/"
              target="_blank"
              className=" ml-8 font-bold hover:underline"
              rel="noreferrer"
              >Mi Linkedin</a>
            </div>

          </div>
          <div className="mt-8 text-center">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
