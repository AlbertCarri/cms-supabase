import AuthButton from "../../components/AuthButton";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation"
import { RestoName } from "../../components/RestoName";
import { ChangeRestoName } from "../../components/ChangeRestoName";
import { NewCategory } from "../../components/NewCategory";
import { ShowCategory } from "../../components/ShowCategory";

export default async function ProtectedPage() {
  const supabase = createClient();

  const { data: { user }, } = await supabase.auth.getUser();
  console.log('Main Page:',user.id)

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-9/12 flex flex-col gap-10 items-center">

      <div className="w-full">
        <nav className="w-full flex justify-end h-16 p-4">
          <AuthButton />
        </nav>
        <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div> {/* línea separadora*/}
      </div>

      <div className="w-full">
        <h2 className="foreground-light">Nombre del Resto :</h2>
        <div className="flex flex-row">
          <RestoName userId={user.id} />
          <ChangeRestoName userId={user.id} />
        </div>
        <div className="mt-16">
          <NewCategory userId={user.id} />
        </div>
        <div>
          <ShowCategory userId={user.id} />
        </div>
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
