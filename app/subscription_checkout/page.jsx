import { redirect } from "next/navigation";
import MonthSuscriptionButton from "../../components/MonthSuscription";
import { createClient } from "../lib/supabase/server";

export default async function SubscriptionCheckout() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <section className="flex flex-col lg:w-3/4 w-full h-svh bg-slate-900">
      <div className="flex w-full bg-yellow-400 h-24 justify-center items-center">
        <h1 className="text-3xl text-black">Mercado Pago checkout</h1>
      </div>
      <div className="mt-8">
        <MonthSuscriptionButton userId={user.id} />
      </div>
    </section>
  );
}
