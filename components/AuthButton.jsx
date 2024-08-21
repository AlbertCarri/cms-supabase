import { createClient } from "../utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4 foreground-light text-xs lg:text-base ml-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-1 px-4 h-10 rounded-md button-red">
          Logout
        </button>
      </form>
    </div>

  ) : (
    <Link
      href="/login"
      className="py-2 px-3 h-10 flex rounded-md button-sky button-sky-hover"
    >
      Login
    </Link>
  );
}
