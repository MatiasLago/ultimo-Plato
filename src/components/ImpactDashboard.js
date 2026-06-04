"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import {
  BarChart3,
  Leaf,
  DollarSign,
  Store,
  Users,
  TrendingDown,
  ShieldCheck,
  Info,
  Calendar,
  Globe
} from "lucide-react";

export default function ImpactDashboard() {
  const { stats } = useApp();

  // Calculated dynamic metrics
  const co2SavedKg = parseFloat((stats.foodRescuedKg * 2.5).toFixed(1));
  const waterSavedLiters = Math.round(stats.foodRescuedKg * 1000); // 1kg of mixed food averages 1000L of water footprint

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return "$ 0";
    }
    return Number(price).toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 });
  };

  // Mock comparison statistics
  const categoriesImpact = [
    { name: "Panadería", percentage: 38, count: Math.round(stats.packsSold * 0.38) },
    { name: "Comida preparada", percentage: 27, count: Math.round(stats.packsSold * 0.27) },
    { name: "Café/Merienda", percentage: 18, count: Math.round(stats.packsSold * 0.18) },
    { name: "Frutas y verduras", percentage: 10, count: Math.round(stats.packsSold * 0.10) },
    { name: "Otros excedentes", percentage: 7, count: Math.round(stats.packsSold * 0.07) }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1">
      {/* Header */}
      <div className="border-b border-border-custom pb-5 mb-8">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground flex items-center">
          <BarChart3 className="mr-3 h-7 w-7 text-primary" />
          Dashboard de Impacto Real
        </h1>
        <p className="text-sm text-muted mt-1">
          Estadísticas y métricas de sostenibilidad en tiempo real para nuestra presentación de hackatón.
        </p>
      </div>

      {/* Main Core Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">

        {/* Indicator 1 */}
        <div className="bg-card-bg border border-border-custom rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <span className="text-xs font-bold text-muted uppercase block">Packs vendidos</span>
          <span className="text-3xl font-black text-foreground block mt-2 pb-1">{stats.packsSold}</span>
        </div>

        {/* Indicator 2 */}
        <div className="bg-card-bg border border-border-custom rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <span className="text-xs font-bold text-muted uppercase block">Alimentos rescatados</span>
          <span className="text-3xl font-black text-foreground block mt-2 pb-1">{stats.foodRescuedKg} kg</span>
        </div>

        {/* Indicator 3 */}
        <div className="bg-card-bg border border-border-custom rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <span className="text-xs font-bold text-muted uppercase block">Ahorro generado</span>
          <span className="text-3xl font-black text-foreground block mt-2 pb-1">{formatPrice(stats.savingsGenerated)}</span>
        </div>

        {/* Indicator 4 */}
        <div className="bg-card-bg border border-border-custom rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <span className="text-xs font-bold text-muted uppercase block">Comercios adheridos</span>
          <span className="text-3xl font-black text-foreground block mt-2 pb-1">{stats.partnerShops}</span>
        </div>

        {/* Indicator 5 */}
        <div className="bg-card-bg border border-border-custom rounded-2xl p-5 shadow-xs relative overflow-hidden col-span-2 sm:col-span-1">
          <span className="text-xs font-bold text-muted uppercase block">Usuarios registrados</span>
          <span className="text-3xl font-black text-foreground block mt-2 pb-1">{stats.registeredUsers}</span>
        </div>
      </div>

      {/* Sustainability and Eco-Impact Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">

        {/* Left Col: Explainer card */}
        <div className="lg:col-span-5 bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#15803d22,#00000000)]"></div>

          <div className="space-y-4 relative z-10">
            <div className="inline-flex rounded-xl bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
              Nuestra Misión
            </div>
            <h3 className="text-2xl font-black">Por qué cada plato cuenta</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              “Cada pack vendido representa comida en buen estado que no terminó en la basura y una oportunidad de ahorro para una persona.”
            </p>
            <p className="text-xs text-neutral-300 leading-relaxed">
              El desperdicio de comida es responsable de cerca del 8% de los residuos orgánicos totales. Salvar comida reduce la presión sobre los vertederos municipales y ayuda a la resiliencia comunitaria.
            </p>
          </div>

          <div className="border-t border-neutral-800 pt-6 mt-8 grid grid-cols-2 gap-4 relative z-10">
            <div>
              <span className="text-xs text-neutral-400 block uppercase font-bold">CO₂ Equivalente Evitado</span>
              <span className="text-2xl font-black text-primary block mt-1">{co2SavedKg} kg</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Equivale a plantar {Math.ceil(co2SavedKg / 20)} árboles</span>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block uppercase font-bold">Agua Dulce Salvada</span>
              <span className="text-2xl font-black text-secondary block mt-1">{waterSavedLiters.toLocaleString("es-AR")} L</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Equivale a {Math.ceil(waterSavedLiters / 250)} duchas de 10 min</span>
            </div>
          </div>
        </div>

        {/* Right Col: Graphs simulated with CSS */}
        <div className="lg:col-span-7 bg-card-bg border border-border-custom rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-extrabold text-lg">Distribución de Alimentos Salvados</h3>
            <p className="text-xs text-muted mt-0.5">Muestra las categorías con mayor índice de rescate local.</p>
          </div>

          {/* Simple simulated bar charts using Tailwind widths */}
          <div className="space-y-4">
            {categoriesImpact.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>{item.name}</span>
                  <span className="text-muted">{item.count} packs ({item.percentage}%)</span>
                </div>

                {/* Bar */}
                <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Note Box */}
          <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-950/40 p-4 border border-border-custom flex items-start space-x-3 text-xs text-muted leading-relaxed">
            <Info className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
            <div>
              <strong>Simulación en vivo para Hackatón:</strong> Los contadores de este dashboard se incrementan de manera automática cada vez que un usuario realiza una reserva desde la sección <strong className="text-foreground">&quot;Buscar Comida&quot;</strong> en esta misma pestaña. Podés reiniciar las estadísticas en cualquier momento con el botón de recarga en la barra superior.
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
