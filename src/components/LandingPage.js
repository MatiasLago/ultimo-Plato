"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import {
  ArrowRight,
  ShoppingBag,
  Store,
  Leaf,
  CheckCircle2,
  DollarSign,
  Heart,
  TrendingDown,
  ChevronRight,
  TrendingUp,
  Globe2
} from "lucide-react";

export default function LandingPage() {
  const { setCurrentRole, stats } = useApp();

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-radial from-emerald-50/60 to-transparent dark:from-emerald-950/20 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Leaf className="mr-1.5 h-3.5 w-3.5" />
              Impacto social y ambiental
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Comida del día, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                a un precio justo
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto">
              Conectamos comercios con excedente del día con personas que buscan comer bien gastando menos. Cada reserva salva comida y le devuelve ingresos a un negocio de tu barrio.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setCurrentRole("consumer")}
                className="group flex w-full sm:w-auto items-center justify-center rounded-2xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Buscar comida cercana
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setCurrentRole("merchant")}
                className="flex w-full sm:w-auto items-center justify-center rounded-2xl border-2 border-border-custom bg-card-bg px-8 py-4 text-base font-bold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all hover:-translate-y-0.5"
              >
                <Store className="mr-2 h-5 w-5 text-secondary" />
                Soy un comercio
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="py-20 lg:py-28 bg-neutral-50/50 dark:bg-neutral-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              ¿Cómo funciona?
            </h2>
            <p className="text-base text-muted">
              Unirse a Último Plato es rápido y genera un impacto real inmediato en tu bolsillo y en el medio ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-card-bg p-6 rounded-2xl border border-border-custom hover:border-primary/30 transition-all group relative">
              <div className="h-12 w-12 rounded-xl bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                <Store className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">1. Comercios cargan</h3>
              <p className="text-sm text-muted">
                Restaurantes y tiendas cargan su producción sobrante del día como packs con grandes descuentos.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-card-bg p-6 rounded-2xl border border-border-custom hover:border-primary/30 transition-all group relative">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">2. Reservás el pack</h3>
              <p className="text-sm text-muted">
                Buscás las ofertas disponibles cerca tuyo y reservás tu pack sorpresa a una fracción del costo.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-card-bg p-6 rounded-2xl border border-border-custom hover:border-primary/30 transition-all group relative">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">3. Retirás en el local</h3>
              <p className="text-sm text-muted">
                Te acercás al local en el horario indicado, mostrás tu código de reserva digital y te llevás la comida.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-card-bg p-6 rounded-2xl border border-border-custom hover:border-primary/30 transition-all group relative">
              <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">4. Salvás y ahorrás</h3>
              <p className="text-sm text-muted">
                Listo! Ahorraste dinero y evitaste que comida se desperdicie
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Beneficios para todos
            </h2>
            <p className="text-base text-muted">
              Último Plato crea una economía circular donde ganan los consumidores, ganan los comercios y gana nuestro planeta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit User */}
            <div className="bg-card-bg p-8 rounded-3xl border border-border-custom shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-secondary">
                  <DollarSign className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Para los Usuarios</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Acceso a comida con descuentos del 50% al 70%. Ideal para estudiantes, trabajadores o cualquier persona que busque optimizar su presupuesto sin sacrificar calidad alimenticia.
                </p>
              </div>
            </div>

            {/* Benefit Merchant */}
            <div className="bg-card-bg p-8 rounded-3xl border border-border-custom shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-primary">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Para los Comercios</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Recuperación de costos sobre comida elaborada que de otra forma se desperdicia. Visibilidad ante nuevos clientes locales que conocen el comercio al ir a retirar y fortalecimiento de su imagen sustentable.
                </p>
              </div>
            </div>

            {/* Benefit Planet */}
            <div className="bg-card-bg p-8 rounded-3xl border border-border-custom shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600">
                  <Globe2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Para el Planeta</h3>
                <p className="text-sm text-muted leading-relaxed">
                  El desperdicio alimentario representa el 8-10% de las emisiones globales de gases de efecto invernadero. Al rescatar comida, reducís la huella de carbono, el consumo inútil de agua y la contaminación del suelo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="bg-neutral-900 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#15803d33,#00000000)]"></div>
        <div className="mx-auto max-w-5xl px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            ¿Listo para empezar a salvar comida?
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
            Registrate gratis como consumidor o sumá tu comercio y formá parte del cambio. Cada plato rescatado cuenta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentRole("consumer")}
              className="flex w-full sm:w-auto items-center justify-center rounded-2xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-primary-hover transition-all"
            >
              Comenzar a Rescatar
            </button>
            <button
              onClick={() => setCurrentRole("merchant")}
              className="flex w-full sm:w-auto items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-800 px-8 py-4 text-base font-bold text-white hover:bg-neutral-700 transition-all"
            >
              Registrar mi Comercio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
