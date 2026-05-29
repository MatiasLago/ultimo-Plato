"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Menu, 
  X, 
  Leaf, 
  Store, 
  User, 
  BarChart3, 
  ShoppingBag,
  RefreshCw,
  Ticket
} from "lucide-react";

export default function Navbar() {
  const { currentRole, setCurrentRole, reservations, resetAllData } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const activeReservationsCount = reservations.filter(r => r.status === "Pendiente de retiro").length;

  const handleNav = (role) => {
    setCurrentRole(role);
    setIsOpen(false);
  };

  const navLinks = [
    { role: "landing", label: "Inicio", icon: Leaf },
    { role: "consumer", label: "Buscar Comida", icon: ShoppingBag },
    { role: "reservations", label: "Mis Reservas", icon: Ticket },
    { role: "merchant", label: "Soy Comercio", icon: Store },
    { role: "impact", label: "Impacto", icon: BarChart3 }
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border-custom bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNav("landing")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20 transition-transform hover:scale-105">
              <Leaf className="h-5.5 w-5.5" />
            </div>
            <span className="ml-3 text-xl font-bold tracking-tight text-foreground sm:block">
              Último<span className="text-secondary font-black">Plato</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentRole === link.role;
              return (
                <button
                  key={link.role}
                  onClick={() => handleNav(link.role)}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-foreground"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {link.label}
                  {link.role === "reservations" && activeReservationsCount > 0 && (
                    <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white animate-pulse">
                      {activeReservationsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Role Toggle Switch & Dev Tool */}
          <div className="hidden md:flex items-center space-x-3 border-l border-border-custom pl-4 lg:pl-6">
            {/* Quick Toggle pill */}
            <div className="inline-flex rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1">
              <button
                onClick={() => handleNav("consumer")}
                className={`flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  currentRole === "consumer"
                    ? "bg-white dark:bg-neutral-800 text-primary shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <User className="mr-1.5 h-3.5 w-3.5" />
                Consumidor
              </button>
              <button
                onClick={() => handleNav("merchant")}
                className={`flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  currentRole === "merchant"
                    ? "bg-white dark:bg-neutral-800 text-secondary shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Store className="mr-1.5 h-3.5 w-3.5" />
                Comercio
              </button>
            </div>

            {/* Reset Stats */}
            <button
              onClick={resetAllData}
              title="Reiniciar datos simulados"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-900 text-muted hover:text-foreground transition-all"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {(currentRole === "consumer" || currentRole === "reservations") && activeReservationsCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white animate-pulse mr-1">
                {activeReservationsCount}
              </span>
            )}
            <button
              onClick={resetAllData}
              title="Reiniciar datos"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-custom text-muted"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-muted hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-foreground transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border-custom bg-background px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentRole === link.role;
            return (
              <button
                key={link.role}
                onClick={() => handleNav(link.role)}
                className={`flex w-full items-center rounded-xl px-4 py-3 text-base font-semibold transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
              >
                <Icon className="mr-3 h-5 w-5 text-muted" />
                {link.label}
                {link.role === "reservations" && activeReservationsCount > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                    {activeReservationsCount}
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="border-t border-border-custom pt-4 mt-2">
            <span className="px-4 text-xs font-semibold text-muted uppercase tracking-wider block mb-2">
              Cambiar Rol
            </span>
            <div className="grid grid-cols-2 gap-2 px-2">
              <button
                onClick={() => handleNav("consumer")}
                className={`flex items-center justify-center rounded-xl py-2.5 text-sm font-bold border transition-all ${
                  currentRole === "consumer"
                    ? "bg-primary/15 border-primary text-primary"
                    : "border-border-custom text-muted hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
              >
                <User className="mr-2 h-4 w-4" />
                Consumidor
              </button>
              <button
                onClick={() => handleNav("merchant")}
                className={`flex items-center justify-center rounded-xl py-2.5 text-sm font-bold border transition-all ${
                  currentRole === "merchant"
                    ? "bg-secondary/15 border-secondary text-secondary"
                    : "border-border-custom text-muted hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
              >
                <Store className="mr-2 h-4 w-4" />
                Comercio
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
