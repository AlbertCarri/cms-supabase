import AuthButton from "../../components/AuthButton";
import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import { ChangeRestoName } from "../../components/ChangeRestoName";
import { NewCategory } from "../../components/NewCategory";
import { ShowCategory } from "../../components/ShowCategory";
import { ShowQr } from "../../components/ShowQr";
import FooterMain from "../../components/FooterMain";
import getAccessLevel from "../lib/subscriptions/getAccessLevel";
import { notifySubscriptionBlocked } from "../lib/subscriptions/notifySubscriptionBlocked";
import Link from "next/link";
import countMenu from "../../utils/supabase/countMenu";

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
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) console.error("Error de Consulta:", error);

  const resto = users.resto_name;
  const email = user.email;

  const accessLevel = await getAccessLevel(users);

  if (accessLevel === "blocked") {
    const { error: cancelError } = await supabase
      .from("users")
      .update({ subscription_status: "cancelled" })
      .eq("user_id", user.id);
    if (cancelError)
      console.error(
        "Error al actualizar el estado de suscripción a 'cancelled':",
        cancelError,
      );
    await notifySubscriptionBlocked({ email, resto });
    return redirect("/subscription_required");
  }

  // Si el restó no tiene nombre, redirige al onboarding
  if (!resto) redirect("onboarding/step-1");

  const urlQr =
    "https://cms-resto.vercel.app/menu/" + resto.replaceAll(" ", "_");

  const limitOfFree = await countMenu(users.id);

  return (
    <>
      <div className="flex flex-col w-full lg:w-4/5 p-2 gap-2 items-center">
        <div className="w-full">
          <nav className="w-full h-16 p-2">
            <AuthButton />
          </nav>
          {limitOfFree && accessLevel === "inactive" && (
            <h2 className="bg-amber-500 mx-auto text-md lg:text-xl text-center p-2 rounded-lg">
              Llegaste al límite del plan free, ya cargaste 20 <b>menús</b>
            </h2>
          )}
          {accessLevel === "grace" && (
            <>
              <h2 className="bg-amber-500 mx-auto text-md lg:text-xl text-center p-2 rounded-lg">
                Tu suscripción está vencida y tienes unos días de gracia
              </h2>
              <h3 className="bg-red-700 mx-auto text-md lg:text-lg text-center p-2 rounded-lg">
                Por favor renueva la suscripción antes de que se bloquee
              </h3>
            </>
          )}
          <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div>{" "}
          {/* línea separadora*/}
        </div>
        <div className="flex flex-row w-full">
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
            <div className="flex flex-col basis-1/2 lg:hidden p-8">
              <Link
                href={"/subscription_checkout"}
                className="btn-sky w-2/3 mx-auto py-2 px-4 rounded-lg mb-4 text-center"
              >
                Suscribirme a Pro
              </Link>
              <ShowQr urlQr={urlQr} fileName={"codigoQR"} />
            </div>
          </div>
          <div className="basis-1/2 hidden lg:block p-8">
            <div className="flex w-full justify-center">
              <Link
                href={"/subscription_checkout"}
                className="btn-sky w-2/3 mx-auto py-2 px-4 rounded-lg mb-4 text-center"
              >
                Suscribirme a Pro
              </Link>
            </div>
            <ShowQr urlQr={urlQr} />
          </div>
        </div>
        <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div>{" "}
        {/* línea separadora*/}
      </div>
      <FooterMain />
    </>
  );
}
