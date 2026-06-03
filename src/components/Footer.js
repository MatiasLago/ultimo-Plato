"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Leaf } from "lucide-react";

export default function Footer() {
  const { setCurrentRole } = useApp();

  return (
    <footer className="border-t border-border-custom bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-border-custom pb-3">
          {/* Brand & Slogan */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentRole("landing")}>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white shadow-xs">
                <Leaf className="h-4 w-4" />
              </div>
              <span className="ml-2 text-base font-bold tracking-tight">
                Último<span className="text-secondary font-black">Plato</span>
              </span>
            </div>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <p className="text-xs font-semibold text-primary">
              Comida que se salva, ahorro que se comparte.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted">
          <p>© {new Date().getFullYear()} Último Plato. Hackathon MVP.</p>
          <p className="mt-1 sm:mt-0">
            Hecho con ❤️ para un planeta más sustentable
          </p>
        </div>
      </div>
    </footer>
  );
}
