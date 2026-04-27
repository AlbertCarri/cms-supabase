"use client";

export default function FooterMain() {
  return (
    <footer className="w-full bg-zinc-800 mt-8 m-0 p-4">
      <div>
        <div className="flex flex-row text-center">
          <div className="flex flex-col basis-1/3">
            <div className="flex space-x-4 mt-4 mx-auto">
              <img
                src="/edelbyte.png"
                alt="logo"
                width={24}
                height={24}
                className="object-scale-down"
              />
              <a
                href="https://servicios.edelbyte.com.ar/"
                target="_blank"
                className="text-lg font-bold hover:underline"
                rel="noreferrer"
              >
                edelbyte
              </a>
            </div>
            <p className="mt-2 text-md text-gray-300">
              Herramientas para emprendedores
            </p>
            <div className="flex space-x-4 mt-2 mx-auto">
              <img
                src="/linkedin.png"
                alt="logo"
                width={24}
                height={24}
                className="object-scale-down"
              />
              <a
                href="https://www.linkedin.com/in/alberto-edelmiro-carrizo-7639a186/"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Mi Linkedin
              </a>
            </div>
          </div>
          <div className="flex flex-col basis-1/3">
          <h3 className="text-lg font-semibold mt-4">Legal</h3>
            <a
                href="/terminos"
                target="_blank"
                className="text-base mt-2 hover:underline"
                rel="noreferrer"
              >
                Términos y condiciones
              </a>
               <a
                href="/privacidad"
                target="_blank"
                className="text-base mt-2 hover:underline"
                rel="noreferrer"
              >
                Política de privacidad
              </a>
          </div>
          <div className="basis-1/3 flex flex-col md:justify-around">
           <h3 className="text-lg font-semibold mt-4">Sobre mi</h3>
            <p className="text-md mt-2 text-gray-300">
              Alberto Edelmiro Carrizo
            </p>
            <p className="text-md mt-2 text-gray-300">
              edelbyte
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-base text-gray-400">
            &copy; 2026 Edelbyte. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Hecho con Next.js, Supabase y Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
