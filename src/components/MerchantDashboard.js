"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  EyeOff, 
  Eye, 
  Store, 
  Clock, 
  DollarSign, 
  Sparkles,
  Layers,
  Inbox,
  CheckCircle,
  FileText,
  BadgeAlert,
  ArrowRight
} from "lucide-react";

export default function MerchantDashboard() {
  const { packs, addPack, updatePack, toggleStock, deletePack, reservations } = useApp();
  
  // Selected merchant profile for demo purposes
  const [selectedShop, setSelectedShop] = useState("Panadería San Martín");
  
  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Panadería");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pickupTime, setPickupTime] = useState("19:00 a 20:00");
  const [description, setDescription] = useState("");
  
  // Code entry for simulated delivery
  const [deliveryCode, setDeliveryCode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState(null);

  const categories = [
    "Panadería",
    "Comida preparada",
    "Café/Merienda",
    "Frutas y verduras",
    "Restaurante",
    "Supermercado"
  ];

  // Auto-assigned default images based on category
  const categoryImages = {
    "Panadería": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    "Comida preparada": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    "Café/Merienda": "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80",
    "Frutas y verduras": "/fruits_and_vegetables.png",
    "Restaurante": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    "Supermercado": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
  };

  const currentShopPacks = packs.filter(p => p.shopName === selectedShop);
  const currentShopReservations = reservations.filter(r => r.shopName === selectedShop);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !quantity || !description) {
      alert("Por favor completá todos los campos.");
      return;
    }

    const packData = {
      title,
      category,
      price: Number(price),
      quantity: Number(quantity),
      pickupTime,
      description,
      shopName: selectedShop,
      address: getShopAddress(selectedShop),
      image: categoryImages[category] || categoryImages["Comida preparada"]
    };

    if (isEditing) {
      updatePack({ id: editId, ...packData });
      setIsEditing(false);
      setEditId(null);
    } else {
      addPack(packData);
    }

    // Reset Form
    setTitle("");
    setCategory("Panadería");
    setPrice("");
    setQuantity("");
    setPickupTime("19:00 a 20:00");
    setDescription("");
  };

  const getShopAddress = (shopName) => {
    switch (shopName) {
      case "Panadería San Martín": return "Av. San Martín 1420";
      case "Rotisería Don Luis": return "Calle Belgrano 345";
      case "Café Centro": return "Peatonal Sarmiento 80";
      case "Verdulería Norte": return "Av. Juan B. Justo 3100";
      case "Restaurante La Esquina": return "Esquina Rivadavia y Colón";
      case "Supermercado Fresh": return "Boulevard Las Heras 950";
      default: return "Calle Comercial 100";
    }
  };

  const handleEdit = (pack) => {
    setIsEditing(true);
    setEditId(pack.id);
    setTitle(pack.title);
    setCategory(pack.category);
    setPrice(pack.price);
    setQuantity(pack.quantity);
    setPickupTime(pack.pickupTime);
    setDescription(pack.description);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setTitle("");
    setPrice("");
    setQuantity("");
    setDescription("");
  };

  const handleSimulateDelivery = (e) => {
    e.preventDefault();
    const res = reservations.find(r => r.code.toUpperCase() === deliveryCode.toUpperCase());
    
    if (res) {
      if (res.shopName !== selectedShop) {
        setDeliveryMessage({
          type: "error",
          text: `El código ${deliveryCode.toUpperCase()} pertenece a otra sucursal: ${res.shopName}`
        });
      } else {
        // Successful simulation
        res.status = "Entregado";
        setDeliveryMessage({
          type: "success",
          text: `¡Pedido ${res.code} entregado con éxito! Se despachó el pack: ${res.packTitle}`
        });
        setDeliveryCode("");
      }
    } else {
      setDeliveryMessage({
        type: "error",
        text: `Código ${deliveryCode.toUpperCase()} no encontrado.`
      });
    }

    setTimeout(() => {
      setDeliveryMessage(null);
    }, 4000);
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return "$ 0";
    }
    return Number(price).toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1">
      {/* Header and Merchant Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border-custom pb-5 mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Panel de Administración del Comercio
          </h1>
          <p className="text-sm text-muted mt-1">
            Cargá tus excedentes gastronómicos del día y gestioná tus ventas.
          </p>
        </div>

        {/* Shop Switcher */}
        <div className="flex items-center space-x-2 shrink-0">
          <Store className="h-4.5 w-4.5 text-secondary" />
          <span className="text-xs font-bold text-muted uppercase">Administrar:</span>
          <select
            value={selectedShop}
            onChange={(e) => {
              setSelectedShop(e.target.value);
              handleCancelEdit();
            }}
            className="bg-card-bg border border-border-custom rounded-xl py-2 px-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary cursor-pointer transition-all"
          >
            <option value="Panadería San Martín">Panadería San Martín</option>
            <option value="Rotisería Don Luis">Rotisería Don Luis</option>
            <option value="Café Centro">Café Centro</option>
            <option value="Verdulería Norte">Verdulería Norte</option>
            <option value="Restaurante La Esquina">Restaurante La Esquina</option>
            <option value="Supermercado Fresh">Supermercado Fresh</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Form and Delivery Simulation */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* New Pack Form */}
          <div className="bg-card-bg border border-border-custom rounded-3xl p-6 shadow-xs">
            <div className="flex items-center space-x-2.5 mb-6">
              <div className="h-9 w-9 rounded-xl bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-secondary">
                <Plus className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-lg">
                {isEditing ? "Editar Pack del Día" : "Publicar Pack del Día"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-muted uppercase block mb-1">Nombre del pack</label>
                <input
                  type="text"
                  placeholder="Ej. Pack Merienda Dulce"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-border-custom bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted uppercase block mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-border-custom bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted uppercase block mb-1">Stock inicial</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Cantidad"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full rounded-xl border border-border-custom bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-muted uppercase block mb-1">Precio del pack</label>
                <input
                  type="number"
                  placeholder="Monto a pagar"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-border-custom bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-muted uppercase block mb-1">Horario de retiro</label>
                <input
                  type="text"
                  placeholder="Ej: 19:00 a 20:00"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full rounded-xl border border-border-custom bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-muted uppercase block mb-1">Descripción del contenido</label>
                <textarea
                  rows="3"
                  placeholder="Detallá de forma general qué productos podrían integrar el pack..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-border-custom bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 rounded-xl border border-border-custom py-3 text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-2 rounded-xl bg-secondary text-white font-extrabold py-3 text-xs shadow-md shadow-secondary/10 hover:bg-secondary-hover hover:shadow-lg active:scale-95 transition-all"
                >
                  {isEditing ? "Guardar cambios" : "Publicar pack sobrante"}
                </button>
              </div>
            </form>
          </div>

          {/* Delivery Simulation Block */}
          <div className="bg-card-bg border border-border-custom rounded-3xl p-6 shadow-xs">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-primary">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-lg">Validar Código Cliente</h3>
            </div>
            
            <p className="text-xs text-muted mb-4 leading-relaxed">
              Simulá el momento en que un cliente llega a tu local y te muestra su código.
            </p>

            <form onSubmit={handleSimulateDelivery} className="flex space-x-2">
              <input
                type="text"
                placeholder="Ej. UP-5729"
                value={deliveryCode}
                onChange={(e) => setDeliveryCode(e.target.value)}
                className="flex-1 rounded-xl border border-border-custom bg-background px-3.5 py-2 text-sm text-foreground uppercase tracking-widest font-mono font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary text-white font-bold px-4 py-2 text-xs hover:bg-primary-hover active:scale-95 transition-all flex items-center"
              >
                Validar <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </button>
            </form>

            {deliveryMessage && (
              <div className={`mt-4 p-3 rounded-xl text-xs font-bold border transition-all ${
                deliveryMessage.type === "success" 
                  ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-primary" 
                  : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
              }`}>
                {deliveryMessage.text}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Listings and Active Reservations */}
        <div className="lg:col-span-8 space-y-8">
          {/* List of Published Packs */}
          <div className="bg-card-bg border border-border-custom rounded-3xl p-6 shadow-xs overflow-hidden">
            <h3 className="font-extrabold text-lg mb-6 flex items-center">
              <Layers className="mr-2.5 h-5 w-5 text-secondary" />
              Packs Publicados ({currentShopPacks.length})
            </h3>

            {currentShopPacks.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-custom text-xs font-bold text-muted uppercase">
                      <th className="pb-3 pr-4">Pack</th>
                      <th className="pb-3 px-4">Precio</th>
                      <th className="pb-3 px-4">Stock</th>
                      <th className="pb-3 px-4">Horario</th>
                      <th className="pb-3 px-4 text-center">Estado</th>
                      <th className="pb-3 pl-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-custom text-sm">
                    {currentShopPacks.map((pack) => {
                      const isAgotado = pack.quantity === 0 || pack.status === "Agotado";
                      return (
                        <tr key={pack.id} className="group hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                          <td className="py-4 pr-4">
                            <div>
                              <p className="font-extrabold text-foreground">{pack.title}</p>
                              <p className="text-xs text-muted mt-0.5">{pack.category}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap font-bold">
                            <span className="text-primary">{formatPrice(pack.price)}</span>
                          </td>
                          <td className="py-4 px-4 font-bold text-center">
                            {pack.quantity}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-xs text-muted">
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3.5 w-3.5 text-muted" />
                              {pack.pickupTime}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              isAgotado 
                                ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400" 
                                : "bg-emerald-50 dark:bg-emerald-950/20 text-primary"
                            }`}>
                              {isAgotado ? "Agotado" : "Activo"}
                            </span>
                          </td>
                          <td className="py-4 pl-4 text-right">
                            <div className="flex items-center justify-end space-x-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEdit(pack)}
                                title="Editar"
                                className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => toggleStock(pack.id)}
                                title={isAgotado ? "Activar" : "Marcar Agotado"}
                                className={`p-2 rounded-lg transition-all ${
                                  isAgotado
                                    ? "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                                    : "text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                                }`}
                              >
                                {isAgotado ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                              </button>
                              <button
                                onClick={() => deletePack(pack.id)}
                                title="Eliminar"
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted border border-dashed border-border-custom rounded-2xl p-6">
                No tenés packs cargados para hoy. Completá el formulario de la izquierda para publicar tu primer excedente.
              </div>
            )}
          </div>

          {/* Active Reservations in Shop */}
          <div className="bg-card-bg border border-border-custom rounded-3xl p-6 shadow-xs overflow-hidden">
            <h3 className="font-extrabold text-lg mb-6 flex items-center">
              <Inbox className="mr-2.5 h-5 w-5 text-primary" />
              Reservas Recibidas ({currentShopReservations.length})
            </h3>

            {currentShopReservations.length > 0 ? (
              <div className="space-y-4">
                {currentShopReservations.map((res) => (
                  <div 
                    key={res.code} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border-custom rounded-2xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm font-black bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-primary">
                          {res.code}
                        </span>
                        <span className="text-xs text-muted">
                          {new Date(res.reservedAt).toLocaleTimeString("es-AR", {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className="font-extrabold text-sm text-foreground">{res.packTitle}</p>
                      <p className="text-xs text-muted flex items-center">
                        <Clock className="mr-1 h-3.5 w-3.5 text-muted" />
                        Retira: {res.pickupTime}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-border-custom">
                      <div className="text-left sm:text-right">
                        <span className="text-xs text-muted block">Precio:</span>
                        <span className="font-extrabold text-primary text-sm">{formatPrice(res.price)}</span>
                      </div>
                      
                      {res.status === "Entregado" ? (
                        <span className="bg-emerald-50 dark:bg-emerald-950/20 text-primary border border-emerald-200 dark:border-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center">
                          <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-primary" />
                          Entregado
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            res.status = "Entregado";
                            // Force state reload
                            setSelectedShop(selectedShop);
                          }}
                          className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-1.5 rounded-lg active:scale-95 transition-all shadow-sm shadow-primary/10"
                        >
                          Entregar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted border border-dashed border-border-custom rounded-2xl p-6">
                Aún no has recibido reservas para el día de hoy. Cuando un cliente reserve uno de tus packs, aparecerá aquí.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
