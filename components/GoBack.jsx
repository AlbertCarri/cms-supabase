import Link from "next/link";
import { ChevronsLeft } from "lucide-react";

export const GoBack = () => {
  return (
    <Link
      href="/main"
      className="flex items-center text-xs lg:text-base no-underline py-1 px-4 h-10 rounded-md button-zinc"
    >
      <ChevronsLeft className="w-4 h-4" />
      <span>Back</span>
    </Link>
  );
};
