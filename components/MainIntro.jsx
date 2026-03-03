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
          <li>Optimiza la experiencia de tus clientes.</li>
          <li>
            Con SuResto podras crear un menú accesible desde cualquier
            dispositivo móvil con lector de códigos QR.
          </li>
          <li>
            Con esta herramienta, podrás personalizar tu menú con el nombre de
            tu restaurante y organizarlo por categorías como pizzas, sándwiches,
            entre otros. Dentro de cada categoría, podrás añadir los platos
            correspondientes con su descripción, precio, foto y alergenos.
          </li>

          <li>
            Una vez configurado, el sistema generará un código QR único que
            podrás descargar e imprimir en el soporte de tu elección para
            ponerlo a disposición de tus clientes.
          </li>
          <li>
            Al escanearlo, tus clientes accederán al menú completo y actualizado
            en su dispositivo móvil. Además, si alguno de tus menús no está
            disponible temporalmente, podrás ocultarlo fácilmente desde la
            aplicación.
          </li>
        </ul>
      </section>

      <section id="pricing" className="w-3/4 h-svh scroll-mt-24">
        <h2 className="text-6xl font-bold text-center mb-8">Princing</h2>
        <div className="flex flex-col md:flex-row mb-4 justify-center items-center gap-8">
          <div className="w-80 h-[500px] bg-slate-800/20 border-gray-300 border-2 rounded-xl">
            <div className="ml-8 mt-8">
              <h2 className="text-2xl font-bold">Plan Free</h2>
              <p>Hasta 20 productos</p>
              <p className="mt-8 text-4xl font-bold">0$</p>
              <div className="w-64 mt-16 border-t-slate-300 border-t-2"></div>
              <p className="mt-16">✅ 1 Emprendimiento</p>
              <p>✅ Logo de tu negocio</p>
              <p>✅ Una imágen representativa</p>
              <p>✅ Paleta de colores</p>
              <p>✅ Categorias(20 productos)</p>
              <p>✅ Menús hasta 20</p>
              <p>✅ Cada menú con imagen</p>
            </div>
          </div>
          <div className="w-80 h-[500px] bg-slate-800/20 border-gray-300 border-2 rounded-xl">
            <div className="ml-8 mt-8">
              <h2 className="text-2xl font-bold">Plan Pro</h2>
              <p>Sin límites</p>
              <p className="mt-8 text-4xl font-bold">5000$</p>

              <div className="w-64 mt-16 border-t-slate-300 border-t-2"></div>
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
