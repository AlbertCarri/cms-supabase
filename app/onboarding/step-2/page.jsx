import { createClient } from "../../lib/supabase/server";
import OnboardingStep2 from "../../../components/OnboardingStep-2";
import { redirect } from "next/dist/server/api-utils";

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) redirect("/auth/login");

  const { data: perfil } = await supabase
    .from("users")
    .select("*")
    .eq("user_uid", user.id)

  return <OnboardingStep2 datosIniciales={perfil} />;
}
