"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed left-0 top-0 flex w-full z-10 bg-slate-800/70 backdrop-blur-md items-center justify-between p-4">
      <div className="text-xl font-bold">
        <Link href="#home">TuRestó</Link>
      </div>
      <ul className="hidden md:flex gap-6 items-center">
        <li>
          <Link href="#features">Características</Link>
        </li>
        <li>
          <Link href="#pricing">Precios</Link>
        </li>
        <li>
          <Link href="#contact">Contacto</Link>
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
              <Link href="#pricing">Precios</Link>
            </li>
            <li>
              <Link href="#contact">Contacto</Link>
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
