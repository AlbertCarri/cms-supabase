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
    <div className="md:w-3/4 w-full flex flex-col gap-10 items-start">
      <div className="w-full flex flex-col md:flex-row backMobil z-0">
        <div className="basis-1/3 text-center my-auto md:p-8 p-2 z-10">
          <b className="md:text-5xl text-4xl inline-flex">
            BIENVENIDOS A:
          </b>
          <br />
          <b className="md:text-8xl text-6xl text-center my-auto">
            SuResto
          </b>
        </div>
        <div className="basis-2/3 flex justify-center w-full">
          <img src="/FondoIntro.png" className="md:w-3/4 w-72 p-4 mobil" alt="imgenPresentacion" />
        </div>
      </div>
      <div className="mx-4">

        <p className="text-4xl">
          Creá tu carta QR
        </p>
        <br />
        <b className="md:text-xl text-md">
          Moderniza tu restaurante o tienda de comidas con un menú dinámico y digital mientras ahorras en impresiones de menús.
        </b>
        <br/>
        <br/>
        <ul role="list" class="marker:text-sky-400 list-disc pl-5 space-y md:text-xl text-md">
          <li>Optimiza la experiencia de tus clientes.</li>
          <li>Con SuResto podras crear un menú accesible desde cualquier dispositivo móvil con lector de códigos QR.</li>
          <li>Con esta herramienta,
            podrás personalizar tu menú con el nombre de tu restaurante y organizarlo por categorías como pizzas,
            sándwiches, entre otros. Dentro de cada categoría, podrás añadir los platos correspondientes con su descripción, precio, foto y alergenos.
          </li>

          <li>Una vez configurado, el sistema generará un código QR único que podrás descargar
            e imprimir en el soporte de tu elección para ponerlo a disposición de tus clientes.
          </li>
          <li>Al escanearlo, tus clientes accederán al menú completo y actualizado en su dispositivo móvil.
            Además, si alguno de tus menús no está disponible temporalmente, podrás ocultarlo fácilmente desde la aplicación.
          </li>
        </ul>
        <br />
        <p className="md:text-xl text-md text-center">
          Puedes probarlo usando un usuario y contraseñas de muestra:<br />
          Usuario: wottan@live.com.ar<br />Contraseña: Vercel2024
        </p>
      </div>
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
            <div className="basis-1/3 flex flex-col md:justify-around">
              <img src="/linkedin.png" alt="logo" width={24} height={24} className="mx-auto object-scale-down" />
              <a
                href="https://www.linkedin.com/in/alberto-edelmiro-carrizo-7639a186/"
                target="_blank"
                className="font-bold hover:underline"
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
