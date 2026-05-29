"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Leaf, Heart, Shield } from "lucide-react";

export default function Footer() {
  const { setCurrentRole } = useApp();

  return (
    <footer className="border-t border-border-custom bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border-custom pb-4">
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

          {/* Social Impact Short Info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-xs text-muted">
            <span className="flex items-center">
              <Heart className="mr-1.5 h-3.5 w-3.5 text-primary shrink-0" />
              0.75 kg salvados por pack
            </span>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <span className="flex items-center">
              <Shield className="mr-1.5 h-3.5 w-3.5 text-secondary shrink-0" />
              Comercios 100% habilitados
            </span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted">
          <p>© {new Date().getFullYear()} Último Plato. Hackathon MVP.</p>
          <p className="mt-1 sm:mt-0">
            Hecho con ❤️ para un planeta más sustentable
          </p>
        </div>
      </div>
    </footer>
  );
}
