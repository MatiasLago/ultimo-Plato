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
      className="group flex flex-col h-full rounded-2xl border border-border-custom bg-card-bg overflow-hidden cursor-pointer hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 relative"
    >
      {/* Image Header */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={pack.image}
          alt={pack.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isAgotado && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
            <span className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black tracking-wider text-white shadow-lg">
              AGOTADO
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Category & Distance */}
        <div className="flex items-center justify-between text-xs font-bold text-muted uppercase tracking-wider">
          <span>{pack.category}</span>
          <span className="flex items-center">
            <MapPin className="mr-1 h-3.5 w-3.5 text-primary" />
            {pack.distance}
          </span>
        </div>

        {/* Title and Shop */}
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-neutral-400">{pack.shopName}</h4>
          <h3 className="font-extrabold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {pack.title}
          </h3>
        </div>

        {/* Timing and Stock Alerts */}
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          {/* Stock state */}
          {isAgotado ? (
            <div className="flex items-center text-xs font-bold text-red-600 dark:text-red-400">
              <AlertTriangle className="mr-1.5 h-4 w-4 shrink-0" />
              Sin unidades disponibles
            </div>
          ) : isLastUnits ? (
            <div className="flex items-center text-xs font-bold text-orange-600 dark:text-orange-400 animate-pulse-soft">
              <AlertTriangle className="mr-1.5 h-4 w-4 shrink-0" />
              ¡Últimas {pack.quantity} unidades!
            </div>
          ) : (
            <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="mr-1.5 h-4 w-4 shrink-0" />
              {pack.quantity} unidades disponibles
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="border-t border-border-custom pt-4 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-muted leading-none mb-1">Precio</span>
            <span className="text-xl font-black text-primary leading-none">
              {formatPrice(pack.price)}
            </span>
          </div>
          
          <button 
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              isAgotado
                ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed"
                : "bg-primary text-white shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:bg-primary-hover active:scale-95"
            }`}
            disabled={isAgotado}
          >
            {isAgotado ? "Ver detalle" : "Reservar pack"}
          </button>
        </div>
      </div>
    </div>
  );
}
