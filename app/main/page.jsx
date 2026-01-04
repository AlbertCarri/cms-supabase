import AuthButton from "../../components/AuthButton";
import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import { ChangeRestoName } from "../../components/ChangeRestoName";
import { NewCategory } from "../../components/NewCategory";
import { ShowCategory } from "../../components/ShowCategory";
import { ShowQr } from "../../components/ShowQr";
import FooterMain from "../../components/FooterMain";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const { data: users, error } = await supabase
    .from("users")
    .select("resto_name")
    .eq("user_uid", user.id);

  let resto;

  if (error) console.error("Error de Consulta:", error);

  if (users.length <= 0) {
    const { data: users, error } = await supabase
      .from("users")
      .insert([{ resto_name: "Nombre del negocio", user_uid: user.id }]);
    resto = "Nombre del negocio";
    if (error) {
      console.error("Error de Consulta:", error);
      return;
    }
  } else {
    resto = users[0].resto_name;
  }
  const urlQr = "https://cms-resto.vercel.app/menu/" + resto;

  return (
    <div className="flex-1 w-9/12 flex flex-col gap-10 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-end h-16 p-4">
          <AuthButton />
        </nav>
        <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div>{" "}
        {/* línea separadora*/}
      </div>
      <div className="flex flex-row">
        <div className="basis-full">
          <h2 className="foreground-light mb-4">Nombre del Restó :</h2>
          <div className="flex flex-row">
            <h2 className="background-window w-48 sm:w-56 p-2 mr-10 rounded-lg">
              {resto}
            </h2>
            <ChangeRestoName userId={user.id} />
          </div>
          <div className="mt-16">
            <NewCategory userId={user.id} />
          </div>
          <div>
            <ShowCategory userId={user.id} />
          </div>
          <div className="basis-1/2 block lg:hidden p-8">
            <ShowQr urlQr={urlQr} fileName={"codigoQR"} />
          </div>
        </div>
        <div className="basis-1/2 hidden lg:block p-8">
          <ShowQr urlQr={urlQr} />
        </div>
      </div>
      <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div>{" "}
      {/* línea separadora*/}
      <FooterMain />
    </div>
  );
}
