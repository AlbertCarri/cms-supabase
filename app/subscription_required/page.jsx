import MonthSuscriptionButton from "../../components/MonthSuscription";
import { createClient } from "../lib/supabase/server";

export default async function SubscriptionRequired() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex flex-col w-full h-svh items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Tu suscripción esta bloqueada</h1>
      <p className="mb-4">
        Para poder seguir utilizando nuestros servicios, por favor renueva tu
        suscripción.
      </p>
      <MonthSuscriptionButton email={user.email} userId={user.id} />
    </div>
  );
}
