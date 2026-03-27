import AuthButton from "../../../components/AuthButton";
import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import { NewMenu } from "../../../components/NewMenu";
import { GoBack } from "../../../components/GoBack";
import { ChangeCategoryName } from "../../../components/ChangeCategoryName";
import FooterMain from "../../../components/FooterMain";
import countMenu from "../../../utils/supabase/countMenu";

export default async function Menu({ params }) {
  const { slug } = await params;
  const name = slug[1].replaceAll("_", " ");
  const categoryId = slug[0];
  let hiddenNewMenu;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!users) {
    return redirect("/auth/login");
  }

  const limitOfFree = await countMenu(users.id);
  if (users.subscription_status === "inactive" && limitOfFree)
    hiddenNewMenu = true;
  else hiddenNewMenu = false;

  return (
    <div className="w-full flex flex-col gap-10 items-center">
      <div className="w-11/12">
        <nav className="w-full flex justify-between h-16 p-4">
          <GoBack />
          <AuthButton />
        </nav>
        <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div>{" "}
        {/* línea separadora*/}
      </div>
      <div className="w-11/12 text-center">
        <ChangeCategoryName name={name} categoryId={categoryId} />
        <NewMenu categoryId={categoryId} hidden={hiddenNewMenu} />
      </div>
      <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div>{" "}
      {/* línea separadora*/}
      <FooterMain />
    </div>
  );
}
