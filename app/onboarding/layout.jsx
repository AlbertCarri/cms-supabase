import "../globals.css";
import { motion } from "motion/react";

export default function OnboardingLayout({ children }) {
  return (
    <main className="w-full background foreground-ligth p-8">
      {children}
    </main>
  );
}
