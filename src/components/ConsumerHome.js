"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import PackCard from "./PackCard";
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Calendar,
  Ticket,
  ChevronRight,
  UtensilsCrossed
} from "lucide-react";

export default function ConsumerHome({ onSelectPack }) {
  const { packs, reservations } = useApp();
  const [activeTab, setActiveTab] = useState("available"); // "available" or "reservations"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("closest"); // "closest" or "price"

  const categories = [
    "Todos",
    "Panadería",
    "Comida preparada",
    "Café/Merienda",
    "Frutas y verduras",
    "Restaurante",
    "Supermercado"
  ];

  // Helper to parse distance to number (e.g. "0.8 km" -> 0.8)
  const parseDistance = (distStr) => {
    return parseFloat(distStr.replace(" km", "")) || 0;
  };

  // Filter packs
  const filteredPacks = packs.filter((pack) => {
    const matchesSearch = 
      pack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      selectedCategory === "Todos" || pack.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort packs
  const sortedPacks = [...filteredPacks].sort((a, b) => {
    if (sortBy === "closest") {
      return parseDistance(a.distance) - parseDistance(b.distance);
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return "$ 0";
    }
    return Number(price).toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1">
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-border-custom pb-5 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            {activeTab === "available" ? "Comida disponible cerca" : "Mis Reservas"}
          </h1>
          <p className="text-sm text-muted mt-1">
            {activeTab === "available" 
              ? "Descubrí packs con comida deliciosa que comercios locales han preparado para hoy." 
              : "Mostrá el código correspondiente al retirar tu pack en el comercio."}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1">
          <button
            onClick={() => setActiveTab("available")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "available"
                ? "bg-white dark:bg-neutral-800 text-primary shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            Packs
          </button>
          <button
            onClick={() => setActiveTab("reservations")}
            className={`relative rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "reservations"
                ? "bg-white dark:bg-neutral-800 text-primary shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            Reservas
            {reservations.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white shadow-sm">
                {reservations.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === "available" ? (
        <>
          {/* Filters Bar */}
          <div className="space-y-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-muted" />
                <input
                  type="text"
                  placeholder="Buscar comercio o tipo de comida..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border-custom bg-card-bg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center space-x-2 shrink-0">
                <SlidersHorizontal className="h-4.5 w-4.5 text-muted" />
                <span className="text-xs font-bold text-muted uppercase">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-card-bg border border-border-custom rounded-xl py-2 px-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-all"
                >
                  <option value="closest">Más cercano</option>
                  <option value="price">Menor precio</option>
                </select>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2 -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap border ${
                    selectedCategory === category
                      ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                      : "bg-card-bg border-border-custom text-muted hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Packs Grid */}
          {sortedPacks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPacks.map((pack) => (
                <PackCard 
                  key={pack.id} 
                  pack={pack} 
                  onSelect={onSelectPack} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card-bg border border-border-custom rounded-3xl p-8 space-y-4 max-w-md mx-auto">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-muted">
                <UtensilsCrossed className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">No se encontraron packs</h3>
              <p className="text-sm text-muted">
                Probá buscando con otros términos o seleccionando otra categoría en los filtros.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Todos");
                }}
                className="rounded-xl bg-primary/10 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/20 transition-all"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </>
      ) : (
        /* Reservations View */
        <div className="space-y-6 max-w-3xl mx-auto">
          {reservations.length > 0 ? (
            reservations.map((res) => (
              <div
                key={res.code}
                className="bg-card-bg border border-border-custom rounded-3xl p-6 shadow-xs relative overflow-hidden group hover:border-primary/20 transition-all"
              >
                {/* Visual strip */}
                <div className="absolute top-0 left-0 bottom-0 w-2 bg-primary"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pl-4">
                  {/* Left block (info) */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black tracking-wide px-2.5 py-1 bg-primary-light text-primary rounded-lg">
                        {res.code}
                      </span>
                      <span className="text-xs font-bold text-muted uppercase">
                        {res.category}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-extrabold text-lg group-hover:text-primary transition-colors">
                        {res.packTitle}
                      </h3>
                      <p className="text-sm font-bold text-neutral-500 mt-0.5">
                        {res.shopName}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-muted">
                      <span className="flex items-center">
                        <MapPin className="mr-1.5 h-4 w-4 text-primary shrink-0" />
                        {res.address}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1.5 h-4 w-4 text-secondary shrink-0" />
                        Retiro: <strong>{res.pickupTime}</strong>
                      </span>
                      <span className="flex items-center sm:col-span-2">
                        <Calendar className="mr-1.5 h-4 w-4 text-muted shrink-0" />
                        Reservado el: {new Date(res.reservedAt).toLocaleDateString("es-AR")} {new Date(res.reservedAt).toLocaleTimeString("es-AR", {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>

                  {/* Right block (ticket-like QR trigger / price) */}
                  <div className="sm:text-right flex sm:flex-col justify-between items-center sm:items-end shrink-0 border-t sm:border-t-0 sm:border-l border-border-custom pt-4 sm:pt-0 sm:pl-6">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-muted">Total a pagar en local</p>
                      <p className="text-2xl font-black text-primary leading-none mt-1">
                        {formatPrice(res.price)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 mt-4 sm:mt-3">
                      <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-lg">
                        <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                        Lista para retirar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-card-bg border border-border-custom rounded-3xl p-8 space-y-4 max-w-md mx-auto">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-muted">
                <Ticket className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">No tenés reservas activas</h3>
              <p className="text-sm text-muted">
                Explorá los packs disponibles de los comercios gastronómicos locales y reservá el tuyo hoy.
              </p>
              <button
                onClick={() => setActiveTab("available")}
                className="rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-hover transition-all"
              >
                Buscar comida cercana
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
