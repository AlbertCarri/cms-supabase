import AuthButton from "../../../components/AuthButton";
import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import { NewMenu } from "../../../components/NewMenu";
import { GoBack } from "../../../components/GoBack";
import { ChangeCategoryName } from "../../../components/ChangeCategoryName";

export default async function Menu({ params }) {
  const { slug } = await params;
  const name = slug[1].replaceAll("_", " ");
  const categoryId = slug[0];

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-11/12 flex flex-col gap-10 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-between h-16 p-4">
          <GoBack />
          <AuthButton />
        </nav>
        <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div>{" "}
        {/* línea separadora*/}
      </div>
      <div className="w-full text-center">
        <ChangeCategoryName name={name} categoryId={categoryId} />
        <NewMenu categoryId={categoryId} />
      </div>
      <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div>{" "}
      {/* línea separadora*/}
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
    </div>
  );
}
