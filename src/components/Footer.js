"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Leaf, Heart, Shield } from "lucide-react";

export default function Footer() {
  const { setCurrentRole } = useApp();

  return (
    <footer className="border-t border-border-custom bg-white dark:bg-neutral-950 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentRole("landing")}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Leaf className="h-4.5 w-4.5" />
              </div>
              <span className="ml-2 text-lg font-bold tracking-tight">
                Último<span className="text-secondary font-black">Plato</span>
              </span>
            </div>
            <p className="text-sm font-semibold text-primary">
              Comida que se salva, ahorro que se comparte.
            </p>
            <p className="text-sm text-muted max-w-sm">
              Conectamos excedentes de comida de comercios gastronómicos con personas dispuestas a darles un buen destino a un costo reducido. Menos basura, más ahorro.
            </p>
          </div>

          {/* Social Impact Col */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
              Impacto Ecológico
            </h3>
            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-primary">
                <Heart className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs text-muted">
                Cada pack rescatado equivale a aproximadamente <strong>0.75 kg de comida</strong> salvada y evita emisiones de CO₂ asociadas a su desperdicio.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-950/30 text-secondary">
                <Shield className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs text-muted">
                100% seguro. Alimentos de calidad manipulados con estrictas normas de higiene por comercios habilitados.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border-custom mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} Último Plato. Hackathon MVP. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0 flex items-center">
            Hecho con ❤️ para un planeta más sustentable
          </p>
        </div>
      </div>
    </footer>
  );
}
