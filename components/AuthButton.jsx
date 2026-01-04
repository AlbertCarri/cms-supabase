"use client";

import { createClient } from "../app/lib/supabase/client";
import { signOut } from "../app/actions/auth";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

export default function AuthButton() {
  const supabase = createClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  return user ? (
    <div className="flex items-center gap-4 foreground-light text-xs lg:text-base ml-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-1 px-4 h-10 rounded-md button-red">Logout</button>
      </form>
    </div>
  ) : (
    <Link
      href="/auth/login"
      className="py-2 px-3 h-10 flex rounded-md button-sky button-sky-hover"
    >
      Login
    </Link>
  );
}
