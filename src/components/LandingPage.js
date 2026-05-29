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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Col (Text) */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Leaf className="mr-1.5 h-3.5 w-3.5" />
                Impacto social y ambiental
              </span>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Salva comida, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  ahorra todos los días.
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-bold text-secondary max-w-2xl mx-auto lg:mx-0">
                “Comida que se salva, ahorro que se comparte.”
              </p>

              <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto lg:mx-0">
                Conectamos a tus comercios favoritos con personas que quieren disfrutar de comida de calidad a una fracción de su precio original. Ayudá al planeta reduciendo el desperdicio de comida.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
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

            {/* Right Col (Graphic Representation) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                {/* Floating graphic elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-2xl animate-float"></div>
                <div className="absolute inset-4 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-6 flex flex-col justify-between border border-border-custom">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-secondary">
                        <Store className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">Panadería San Martín</h4>
                        <p className="text-xs text-muted">A 800m • Retiro 19h</p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 dark:bg-emerald-950/60 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">
                      Excedente salvado
                    </span>
                  </div>

                  <div className="my-6 space-y-2">
                    <div className="h-40 w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                      <img
                        src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
                        alt="Facturas mock"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs rounded-xl p-2.5 text-white flex items-center justify-between">
                        <span className="text-xs font-semibold">Pack Sorpresa Facturas</span>
                        <div className="text-right">
                          <span className="text-sm font-bold text-secondary-hover">$2.500</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs border-t border-border-custom pt-3">
                    <span className="text-muted">⚡ Quedan 3 disponibles</span>
                    <button
                      onClick={() => setCurrentRole("consumer")}
                      className="text-primary font-bold flex items-center hover:underline"
                    >
                      Reservar <ChevronRight className="h-3 w-3 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Counter Section */}
      <section className="border-y border-border-custom bg-white dark:bg-neutral-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <div className="space-y-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                {stats.packsSold}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-wider">
                Packs Rescatados
              </p>
            </div>
            {/* Stat 2 */}
            <div className="space-y-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                {stats.foodRescuedKg} kg
              </span>
              <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-wider">
                Alimentos Salvados
              </p>
            </div>
            {/* Stat 3 */}
            <div className="space-y-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
                ${stats.savingsGenerated.toLocaleString("es-AR")}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-wider">
                Pesos Ahorrados
              </p>
            </div>
            {/* Stat 4 */}
            <div className="space-y-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {stats.partnerShops}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-wider">
                Comercios Adheridos
              </p>
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
                ¡Listo! Ahorraste dinero y evitaste que comida deliciosa termine en la basura. ¡El planeta te lo agradece!
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
            <div className="bg-card-bg p-8 rounded-3xl border border-border-custom shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-secondary">
                  <DollarSign className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Para los Usuarios</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Acceso a comida deliciosa y en perfecto estado con descuentos del 50% al 70%. Ideal para estudiantes, trabajadores o cualquier persona que busque optimizar su presupuesto sin sacrificar calidad alimenticia.
                </p>
              </div>
              <ul className="mt-6 space-y-2 border-t border-border-custom pt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                <li className="flex items-center">✨ Ahorro garantizado del &gt;50%</li>
                <li className="flex items-center">📍 Comercios en tu propio barrio</li>
                <li className="flex items-center">🍲 Variedad gastronómica diaria</li>
              </ul>
            </div>

            {/* Benefit Merchant */}
            <div className="bg-card-bg p-8 rounded-3xl border border-border-custom shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-primary">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Para los Comercios</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Recuperación de costos sobre comida elaborada que de otra forma iría a la basura. Visibilidad ante nuevos clientes locales que conocen el comercio al ir a retirar y fortalecimiento de su imagen sustentable.
                </p>
              </div>
              <ul className="mt-6 space-y-2 border-t border-border-custom pt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                <li className="flex items-center">💰 Recuperación de costos de materia prima</li>
                <li className="flex items-center">📉 Reducción a cero de residuos orgánicos</li>
                <li className="flex items-center">📣 Marketing orgánico y nuevos clientes</li>
              </ul>
            </div>

            {/* Benefit Planet */}
            <div className="bg-card-bg p-8 rounded-3xl border border-border-custom shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600">
                  <Globe2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Para el Planeta</h3>
                <p className="text-sm text-muted leading-relaxed">
                  El desperdicio alimentario representa el 8-10% de las emisiones globales de gases de efecto invernadero. Al rescatar comida, reducís la huella de carbono, el consumo inútil de agua y la contaminación del suelo.
                </p>
              </div>
              <ul className="mt-6 space-y-2 border-t border-border-custom pt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                <li className="flex items-center">🌱 Reducción drástica del desperdicio</li>
                <li className="flex items-center">📉 Menor huella de carbono generada</li>
                <li className="flex items-center">💧 Conservación de agua y recursos</li>
              </ul>
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
