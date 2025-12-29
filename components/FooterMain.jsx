"use client";

export default function FooterMain() {
  return (
    <footer className="w-full bg-zinc-800 mt-8 m-0 p-4">
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
            <img
              src="/linkedin.png"
              alt="logo"
              width={24}
              height={24}
              className="mx-auto object-scale-down"
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
  );
}
