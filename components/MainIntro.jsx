"use client";

export default function MainIntro() {
  return (
    <main>
      <div className="w-full flex flex-col gap-10 items-start">
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
        <section id="features" className="w-3/4 mt-8 mx-auto">
          <p className="text-4xl">Creá tu carta QR</p>
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
              tu restaurante y organizarlo por categorías como pizzas,
              sándwiches, entre otros. Dentro de cada categoría, podrás añadir
              los platos correspondientes con su descripción, precio, foto y
              alergenos.
            </li>

            <li>
              Una vez configurado, el sistema generará un código QR único que
              podrás descargar e imprimir en el soporte de tu elección para
              ponerlo a disposición de tus clientes.
            </li>
            <li>
              Al escanearlo, tus clientes accederán al menú completo y
              actualizado en su dispositivo móvil. Además, si alguno de tus
              menús no está disponible temporalmente, podrás ocultarlo
              fácilmente desde la aplicación.
            </li>
          </ul>
          <br />
          <p className="md:text-xl text-md text-center">
            Puedes probarlo usando un usuario y contraseñas de muestra:
            <br />
            Usuario: wottan@live.com.ar
            <br />
            Contraseña: Vercel2024
          </p>
        </section>
        <div className="w-full flex justify-center items-center p-3 text-md"></div>
      </div>
    </main>
  );
}
