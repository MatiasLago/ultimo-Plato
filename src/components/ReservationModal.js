"use client";

import React from "react";
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Ticket, 
  Share2, 
  Download,
  AlertCircle
} from "lucide-react";

export default function ReservationModal({ reservation, onClose }) {
  if (!reservation) return null;

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return "$ 0";
    }
    return Number(price).toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-6 overflow-y-auto">
      {/* Container */}
      <div className="relative w-full max-w-md bg-card-bg rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-border-custom flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-y-auto animate-float">
        
        {/* Confetti-like success top panel */}
        <div className="bg-primary p-6 text-white text-center flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 mb-3 animate-pulse-soft">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-black">¡Reserva Confirmada!</h2>
          <p className="text-xs text-emerald-100 mt-1">El stock ha sido actualizado en tiempo real.</p>
        </div>

        {/* Ticket layout */}
        <div className="p-6 sm:p-8 space-y-6 relative bg-white dark:bg-neutral-900">
          {/* Half circles on the side for ticket aesthetics */}
          <div className="absolute top-1/2 -left-3 h-6 w-6 rounded-full bg-neutral-900/60 dark:bg-black/60 backdrop-blur-xs"></div>
          <div className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-neutral-900/60 dark:bg-black/60 backdrop-blur-xs"></div>

          {/* Ticket Header (Code) */}
          <div className="text-center space-y-2 border-b-2 border-dashed border-border-custom pb-6">
            <p className="text-xs font-bold text-muted uppercase tracking-wider">Código de retiro digital</p>
            <div className="inline-flex rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-border-custom px-6 py-3 font-mono text-3xl font-black tracking-widest text-primary shadow-inner">
              {reservation.code}
            </div>
            <p className="text-xs text-muted max-w-xs mx-auto">
              Mostrá este código en el local al momento de retirar tu pack.
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-4 py-2 text-sm">
            <div className="flex items-start space-x-3">
              <Ticket className="mt-0.5 h-4.5 w-4.5 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted block">Pack Reservado</span>
                <span className="font-extrabold text-foreground">{reservation.packTitle}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="mt-0.5 h-4.5 w-4.5 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted block">Comercio y Dirección</span>
                <span className="font-extrabold text-foreground">{reservation.shopName}</span>
                <span className="text-xs text-muted block mt-0.5">{reservation.address}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="mt-0.5 h-4.5 w-4.5 text-secondary shrink-0" />
              <div>
                <span className="text-xs text-muted block">Horario límite de retiro</span>
                <span className="font-extrabold text-foreground">{reservation.pickupTime}</span>
              </div>
            </div>
          </div>

          {/* Simulated QR Code representation */}
          <div className="flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950/40 rounded-2xl p-4 border border-border-custom text-center">
            {/* Simple representation of QR code with css blocks */}
            <div className="grid grid-cols-4 gap-1 p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-xs mb-2">
              <div className="h-6 w-6 bg-black dark:bg-white rounded"></div>
              <div className="h-6 w-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
              <div className="h-6 w-6 bg-neutral-400 dark:bg-neutral-500 rounded"></div>
              <div className="h-6 w-6 bg-black dark:bg-white rounded"></div>
              
              <div className="h-6 w-6 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-6 w-6 bg-black dark:bg-white rounded"></div>
              <div className="h-6 w-6 bg-neutral-100 dark:bg-neutral-900 rounded"></div>
              <div className="h-6 w-6 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              
              <div className="h-6 w-6 bg-neutral-400 dark:bg-neutral-500 rounded"></div>
              <div className="h-6 w-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
              <div className="h-6 w-6 bg-black dark:bg-white rounded"></div>
              <div className="h-6 w-6 bg-neutral-100 dark:bg-neutral-900 rounded"></div>
              
              <div className="h-6 w-6 bg-black dark:bg-white rounded"></div>
              <div className="h-6 w-6 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-6 w-6 bg-neutral-400 dark:bg-neutral-500 rounded"></div>
              <div className="h-6 w-6 bg-black dark:bg-white rounded"></div>
            </div>
            <span className="text-[10px] font-bold text-muted tracking-wide uppercase">QR de retiro rápido</span>
          </div>

          {/* Pricing notification */}
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted block leading-none mb-0.5">Total a abonar en el comercio:</span>
              <span className="text-xl font-black text-primary">{formatPrice(reservation.price)}</span>
            </div>
            <div className="flex items-center text-xs font-bold text-primary bg-white dark:bg-neutral-800 border border-border-custom rounded-xl px-2.5 py-1">
              Efectivo / Tarjeta / QR
            </div>
          </div>

          {/* Info notification */}
          <div className="flex items-start space-x-2 text-xs text-muted">
            <AlertCircle className="h-4 w-4 text-muted shrink-0 mt-0.5" />
            <p>
              El pago se realiza directamente en el local gastronómico. No realizamos cobros en la aplicación.
            </p>
          </div>

          {/* Footer Action */}
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-neutral-900 text-white font-extrabold py-4 hover:bg-neutral-800 transition-all text-sm active:scale-95 shadow-md"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
