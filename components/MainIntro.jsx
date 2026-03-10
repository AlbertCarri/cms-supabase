"use client";

import { useActionState } from "react";
import { sendForm } from "../app/actions/sendForm";

export default function MainIntro() {
  const [state, sendQuestion, isPending] = useActionState(sendForm, "");
  return (
    <main className="w-full h-fit flex flex-col gap-10 justify-center mt-16 items-center">
      <section
        id="#home"
        className="flex flex-col w-3/4 h-svh scroll-mt-20 justify-center items-center"
      >
        <div className="w-full flex flex-col h-60 items-center justify-center text-center backMobil z-0">
          <b className="w-3/4 md:text-6xl text-4xl">
            Crea tu carta de menú digital
          </b>
          <p className="w-3/4 mt-4 md:text-5xl text-4xl">
            Imprimí el Código QR y compartilo
          </p>
        </div>
        <div className="flex w-full justify-center">
          <img
            src="/FondoIntro.png"
            className="p-4 mobil"
            alt="imgenPresentacion"
            width={200}
          />
        </div>
      </section>
      <section id="features" className="w-3/4 h-svh mt-8 mx-auto scroll-mt-24">
        <h2 className="text-6xl font-bold text-center mb-8">
          Creá tu carta QR
        </h2>
        <br />
        <b className="md:text-xl text-md">
          Moderniza tu restaurante o tienda de comidas con un menú dinámico y
          digital mientras ahorras en impresiones de menús.
        </b>
        <br />
        <br />
        <ul
          role="list"
          className="marker:text-sky-400 list-disc pl-5 space-y md:text-xl text-md"
        >
          <li>
            Digitalizá el menú de tu restaurante o emprendimiento gastronómico
            de forma simple y profesional.
          </li>
          <li>
            TuResto es un sistema de menú digital pensado para un solo negocio,
            totalmente personalizable con el nombre, logo y colores que
            representen tu marca.
          </li>
          <li>
            Desde el panel de administración podés crear y organizar tu menú en
            categorías como pizzas, hamburguesas, bebidas o las que necesites.
            Dentro de cada categoría podés agregar los platos con su foto,
            descripción, precio y la información de alérgenos o preferencias
            alimentarias más comunes, como opciones veganas, vegetarianas, sin
            gluten o dietéticas.
          </li>

          <li>
            El sistema también permite filtrar el menú según estas preferencias,
            facilitando que cada cliente encuentre rápidamente las opciones que
            se adaptan a su alimentación.
          </li>
          <li>
            Una vez configurado el menú, TuResto genera automáticamente un
            código QR listo para descargar e imprimir. Al escanearlo, tus
            clientes acceden al menú actualizado desde cualquier teléfono o
            dispositivo con navegador, sin necesidad de instalar ninguna
            aplicación.
          </li>
        </ul>
          <h2 className="text-xl mt-4">
            Actualizá tu menú en segundos, sin volver a imprimir cartas. Si
            algún plato no está disponible temporalmente, podés ocultarlo
            fácilmente desde el panel de administración y el cambio se verá
            reflejado al instante en el menú digital.
          </h2>
      </section>

      <section id="pricing" className="w-3/4 h-svh scroll-mt-24">
        <h2 className="text-6xl font-bold text-center mb-8">Princing</h2>
        <div className="flex flex-col md:flex-row mb-4 justify-center items-center gap-8">
          <div className="w-80 h-[500px] bg-slate-800/20 border-gray-500 border rounded-xl">
            <div className="ml-8 mt-8">
              <h2 className="text-2xl font-bold">Plan Free</h2>
              <p>Hasta 20 productos</p>
              <p className="mt-8 text-4xl font-bold">0$</p>
              <div className="w-64 mt-16 border-t-slate-500 border border-t-2"></div>
              <p className="mt-16">✅ 1 Emprendimiento</p>
              <p>✅ Logo de tu negocio</p>
              <p>✅ Una imágen representativa</p>
              <p>✅ Paleta de colores</p>
              <p>✅ Categorias(20 productos)</p>
              <p>✅ Menús hasta 20</p>
              <p>✅ Cada menú con imagen</p>
            </div>
          </div>
          <div className="w-80 h-[500px] bg-slate-800/20 border-gray-500 border rounded-xl">
            <div className="ml-8 mt-8">
              <h2 className="text-2xl font-bold">Plan Pro</h2>
              <p>Sin límites</p>
              <p className="mt-8 text-4xl font-bold">5000$</p>

              <div className="w-64 mt-16 border-t-slate-500 border border-t-2"></div>
              <p className="mt-16">✅ 1 Emprendimiento</p>
              <p>✅ Logo de tu negocio</p>
              <p>✅ Una imágen representativa</p>
              <p>✅ Paleta de colores</p>
              <p>✅ Categorias ilimitadas</p>
              <p>✅ Menús ilimitados</p>
              <p>✅ Cada menú con imagen</p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="w-3/4 h-svh scroll-mt-24">
        <h2 className="text-6xl font-bold text-center mb-8">
          Formulario de consulta
        </h2>
        <form action={sendQuestion} className="flex flex-col gap-2 text-black">
          <label htmlFor="name" className="text-slate-100 font-bold">
            Ingrese su Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Su nombre"
            className="h-8 p-2 rounded-lg"
            required
          />
          <label htmlFor="email" className="mt-8 text-slate-100 font-bold">
            Ingrese su email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Su email"
            className="h-8 p-2 rounded-lg"
            required
          />
          <label htmlFor="text" className="mt-8 text-slate-100 font-bold">
            Ingrese su consulta
          </label>
          <textarea
            id="text"
            name="text"
            type="textarea"
            placeholder="Su consulta....."
            rows={8}
            className="p-2 rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-emerald-500 text-white font-bold mt-4 w-44 mx-auto p-4 rounded-md"
          >
            {isPending ? "Enviando..." : "Enviar consulta"}
          </button>
        </form>
      </section>
    </main>
  );
}
