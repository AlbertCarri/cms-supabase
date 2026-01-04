"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex bg-slate-800 items-center justify-between p-4">
      <div className="text-xl font-bold">TuRestó</div>
      <ul className="hidden md:flex gap-6 items-center">
        <li>
          <Link href="#features">Características</Link>
        </li>
        <li>
          <Link href="/pricing">Precios</Link>
        </li>
        <li>
          <Link href="/about">Acerca</Link>
        </li>
        <li className="btn-zinc rounded-lg py-1 px-4">
          <Link href="/auth/login">Comenzar</Link>
        </li>
      </ul>
      <button
        className="md:hidden z-20"
        aria-controls="mobile-menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        Burger
      </button>
      {open && (
        <div className="absolute top-0 left-0 z-10 w-full h-auto p-6">
          <ul className="flex flex-col w-3/4 bg-slate-950 mx-auto items-center gap-4 p-4 rounded-lg">
            <li>
              <Link href="#features">Características</Link>
            </li>
            <li>
              <Link href="/pricing">Precios</Link>
            </li>
            <li>
              <Link href="/about">Acerca</Link>
            </li>
            <li className="btn-zinc rounded-lg py-1 px-4">
              <Link href="/auth/login">Comenzar</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
