import AuthButton from "../../../components/AuthButton";
import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import { NewMenu } from "../../../components/NewMenu";
import { GoBack } from "../../../components/GoBack";
import { ChangeCategoryName } from "../../../components/ChangeCategoryName";
import FooterMain from "../../../components/FooterMain";

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
      <FooterMain />
    </div>
  );
}
