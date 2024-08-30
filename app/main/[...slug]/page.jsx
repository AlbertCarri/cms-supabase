import AuthButton from "../../../components/AuthButton";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation"
import { NewMenu } from "../../../components/NewMenu";
import { GoBack } from "../../../components/GoBack";

export default async function Menu({ params }) {

    const name = (params.slug[1]).replaceAll('_',' ')
    const categoryId = params.slug[0]

    const supabase = createClient();

    const { data: { user }, } = await supabase.auth.getUser();

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
                <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div> {/* línea separadora*/}
            </div>

            <div className="w-full text-center">
                <p className="foreground-light text-4xl mb-10">{name}</p>
                <NewMenu categoryId={categoryId} />
                
            </div>
            <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div> {/* línea separadora*/}
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
    )
}