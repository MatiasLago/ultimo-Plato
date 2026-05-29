"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  X, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck,
  ChevronLeft
} from "lucide-react";

export default function PackDetail({ pack, onClose, onReserveSuccess }) {
  const { reservePack } = useApp();
  const [loading, setLoading] = useState(false);

  if (!pack) return null;

  const isAgotado = pack.quantity === 0 || pack.status === "Agotado";
  const isLastUnits = pack.quantity > 0 && pack.quantity <= 2;

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return "$ 0";
    }
    return Number(price).toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 });
  };

  const handleReserve = () => {
    setLoading(true);
    // Simulate short delay for premium feel
    setTimeout(() => {
      const reservation = reservePack(pack.id);
      setLoading(false);
      if (reservation) {
        onReserveSuccess(reservation);
      } else {
        alert("Ocurrió un error. El pack podría haberse agotado.");
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      {/* Container */}
      <div className="relative w-full max-w-2xl bg-card-bg rounded-3xl overflow-hidden shadow-2xl border border-border-custom flex flex-col my-auto">
        {/* Header/Banner Image */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={pack.image}
            alt={pack.title}
            className="h-full w-full object-cover"
          />
          {/* Close button overlay */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-all active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>

          {isAgotado && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="rounded-xl bg-red-600 px-6 py-2.5 text-base font-black tracking-wider text-white shadow-lg">
                AGOTADO
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Category & Shop Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-md bg-primary-light px-2.5 py-0.5 text-xs font-bold text-primary">
                {pack.category}
              </span>
              <span className="text-xs font-bold text-muted flex items-center">
                <MapPin className="mr-1 h-3.5 w-3.5 text-primary" />
                A {pack.distance} de distancia
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              {pack.title}
            </h2>
            <p className="text-sm font-bold text-neutral-500">
              Comercio: {pack.shopName}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center rounded-full bg-orange-50 border border-orange-200 px-3 py-1.5 text-xs font-extrabold text-secondary shadow-xs">
                <Clock className="mr-1.5 h-3.5 w-3.5 text-secondary animate-pulse-soft" />
                Horario de retiro: {pack.pickupTime}
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-extrabold text-primary shadow-xs">
                📍 {pack.address}
              </span>
            </div>
          </div>

          {/* Details list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-border-custom py-5">
            <div className="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted leading-none">Dirección de retiro</p>
                <p className="font-extrabold mt-1 text-foreground">{pack.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 text-secondary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted leading-none">Horario exclusivo de retiro</p>
                <p className="font-extrabold mt-1 text-foreground">{pack.pickupTime}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted">¿Qué contiene el pack?</h4>
            <p className="text-sm text-muted leading-relaxed">
              {pack.description}
            </p>
            <div className="rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 p-3.5 flex items-start space-x-2.5">
              <AlertTriangle className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
              <p className="text-xs text-secondary-hover font-medium">
                <strong>Aclaración importante:</strong> El contenido exacto puede variar según el excedente del día del comercio. ¡Es una sorpresa sustentable!
              </p>
            </div>
          </div>

          {/* Stock Alert */}
          <div className="flex items-center text-xs font-bold">
            {isAgotado ? (
              <span className="flex items-center text-red-600 dark:text-red-400">
                <AlertTriangle className="mr-1.5 h-4 w-4" />
                Sin stock disponible. Este comercio ya ha agotado sus excedentes de hoy.
              </span>
            ) : isLastUnits ? (
              <span className="flex items-center text-orange-600 dark:text-orange-400 animate-pulse-soft">
                <AlertTriangle className="mr-1.5 h-4 w-4" />
                ¡Atención! Quedan solo {pack.quantity} packs disponibles.
              </span>
            ) : (
              <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                Disponibilidad asegurada. Quedan {pack.quantity} packs disponibles.
              </span>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between border-t border-border-custom pt-6">
            <div className="flex flex-col">
              <span className="text-xs text-muted mb-1 font-bold uppercase tracking-wider">Precio del pack</span>
              <span className="text-3xl font-black text-primary leading-none">
                {formatPrice(pack.price)}
              </span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="hidden sm:inline-flex items-center justify-center rounded-2xl border border-border-custom px-5 py-3.5 text-sm font-bold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all"
              >
                Volver
              </button>
              <button
                onClick={handleReserve}
                disabled={isAgotado || loading}
                className={`flex items-center justify-center rounded-2xl px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all ${
                  isAgotado
                    ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed"
                    : loading
                    ? "bg-primary/70 text-white cursor-wait"
                    : "bg-primary shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary-hover hover:-translate-y-0.5 active:scale-95"
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Reservando...
                  </span>
                ) : (
                  "Reservar Último Plato"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
