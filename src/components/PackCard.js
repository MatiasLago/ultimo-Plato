"use client";

import React from "react";
import { MapPin, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function PackCard({ pack, onSelect }) {
  const isAgotado = pack.quantity === 0 || pack.status === "Agotado";
  const isLastUnits = pack.quantity > 0 && pack.quantity <= 2;

  // Formatting currency
  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return "$ 0";
    }
    return Number(price).toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 });
  };

  return (
    <div 
      onClick={() => onSelect(pack)}
      className="group flex flex-col h-full max-w-[300px] sm:max-w-none mx-auto w-full rounded-2xl border border-border-custom bg-card-bg overflow-hidden cursor-pointer hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 relative"
    >
      {/* Image Header */}
      <div className="relative h-40 sm:h-48 w-full shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={pack.image}
          alt={pack.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isAgotado && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
            <span className="rounded-xl bg-red-600 px-2.5 py-1 text-[10px] sm:text-xs font-black tracking-wider text-white shadow-lg">
              AGOTADO
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between min-w-0">
        {/* Category */}
        <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
          {pack.category}
        </div>

        {/* Title, Shop and Distance */}
        <div className="space-y-0.5 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-neutral-400">
            <span>{pack.shopName}</span>
            <span className="text-neutral-300">•</span>
            <span className="flex items-center text-primary">
              <MapPin className="mr-0.5 h-3.5 w-3.5 text-primary shrink-0" />
              {pack.distance}
            </span>
          </div>
          <h3 className="font-extrabold text-sm sm:text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {pack.title}
          </h3>
        </div>

        {/* Timing and Stock Alerts */}
        <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
          {/* Stock state */}
          {isAgotado ? (
            <div className="flex items-center font-bold text-red-600">
              <AlertTriangle className="mr-1 h-3.5 w-3.5 shrink-0" />
              Agotado
            </div>
          ) : isLastUnits ? (
            <div className="flex items-center font-bold text-orange-600 animate-pulse-soft">
              <AlertTriangle className="mr-1 h-3.5 w-3.5 shrink-0" />
              ¡Últimos {pack.quantity}!
            </div>
          ) : (
            <div className="flex items-center font-bold text-emerald-600">
              <CheckCircle2 className="mr-1 h-3.5 w-3.5 shrink-0" />
              {pack.quantity} disponibles
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="border-t border-border-custom pt-3 sm:pt-4 flex flex-col gap-2 mt-auto">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-muted font-bold">Precio</span>
            <span className="text-sm sm:text-xl font-black text-primary leading-none">
              {formatPrice(pack.price)}
            </span>
          </div>
          
          <button 
            className={`rounded-xl py-2 px-4 text-xs font-bold transition-all text-center w-full shrink-0 ${
              isAgotado
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-hover active:scale-95 shadow-xs"
            }`}
            disabled={isAgotado}
          >
            {isAgotado ? "Detalle" : "Reservar"}
          </button>
        </div>
      </div>
    </div>
  );
}
