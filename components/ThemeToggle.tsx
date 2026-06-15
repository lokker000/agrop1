"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

// Toggle de modo claro/oscuro. Persiste en localStorage y aplica la
// clase `.dark` sobre <html>. (El script anti-parpadeo del layout fija
// el tema antes del primer render.)
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={dark ? "Modo claro" : "Modo oscuro"}
      className="fab btn-tactile glass bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full text-emerald-700 shadow-lg ring-1 ring-white/40 dark:text-amber-300"
    >
      {/* Evita mismatch de hidratación mostrando icono tras montar */}
      {mounted ? (
        dark ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
