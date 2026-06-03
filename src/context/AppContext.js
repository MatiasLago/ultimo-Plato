"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const initialPacks = [
  {
    id: "p1",
    shopName: "Panadería San Martín",
    category: "Panadería",
    title: "Pack Sorpresa de Facturas",
    description: "Una deliosa variedad de facturas del día (medialunas, vigilantes, tortitas negras). El contenido exacto varía según la producción sobrante.",
    price: 2500,
    pickupTime: "19:00 a 20:00",
    distance: "0.8 km",
    quantity: 4,
    address: "Av. San Martín 1420",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    status: "Activo"
  },
  {
    id: "p2",
    shopName: "Rotisería Don Luis",
    category: "Comida preparada",
    title: "Pack Vianda Almuerzo/Cena",
    description: "Plato caliente del día (pastas, guiso, pastel de papas o milanesa con guarnición). Listas para calentar y disfrutar.",
    price: 3500,
    pickupTime: "21:00 a 22:00",
    distance: "1.2 km",
    quantity: 3,
    address: "Calle Belgrano 345",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    status: "Activo"
  },
  {
    id: "p3",
    shopName: "Café Centro",
    category: "Café/Merienda",
    title: "Pack Merenda Express",
    description: "Incluye 1 café o infusión envasada, 2 budines o porciones de torta, y un sándwich de jamón y queso sobrantes del día.",
    price: 2000,
    pickupTime: "18:00 a 19:00",
    distance: "0.4 km",
    quantity: 2,
    address: "Peatonal Sarmiento 80",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80",
    status: "Activo"
  },
  {
    id: "p4",
    shopName: "Verdulería Norte",
    category: "Frutas y verduras",
    title: "Cajón Rescate Saludable",
    description: "Mix de frutas y verduras maduras seleccionadas ideales para consumir en el día, preparar mermeladas, tartas o jugos.",
    price: 3000,
    pickupTime: "17:00 a 18:00",
    distance: "2.1 km",
    quantity: 5,
    address: "Av. Juan B. Justo 3100",
    image: "/fruits_and_vegetables.png",
    status: "Activo"
  },
  {
    id: "p5",
    shopName: "Restaurante La Esquina",
    category: "Restaurante",
    title: "Pack Pasta Gourmet",
    description: "Porción abundante de pasta artesanal con salsa de la casa (bolognesa, fileto o crema). Hecho en el día.",
    price: 4000,
    pickupTime: "22:00 a 22:45",
    distance: "1.5 km",
    quantity: 2,
    address: "Esquina Rivadavia y Colón",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    status: "Activo"
  },
  {
    id: "p6",
    shopName: "Supermercado Fresh",
    category: "Supermercado",
    title: "Bolsa Sorpresa Almacén",
    description: "Productos secos y lácteos con fecha de vencimiento cercana (dentro de los próximos 3-5 días) pero en perfecto estado de consumo.",
    price: 5000,
    pickupTime: "20:00 a 21:00",
    distance: "2.8 km",
    quantity: 6,
    address: "Boulevard Las Heras 950",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    status: "Activo"
  },
  {
    id: "p7",
    shopName: "Panadería San Martín",
    category: "Panadería",
    title: "Pack Pan de Campo y Prepizzas",
    description: "Panes artesanales recién horneados por la mañana y prepizzas caseras sin conservantes que no se vendieron en el día.",
    price: 1800,
    pickupTime: "19:00 a 20:00",
    distance: "0.8 km",
    quantity: 3,
    address: "Av. San Martín 1420",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    status: "Activo"
  },
  {
    id: "p8",
    shopName: "Café Centro",
    category: "Café/Merienda",
    title: "Pack Sándwiches Fríos",
    description: "Sándwiches de miga triples de diversos sabores (jamón y queso, verdura, choclo) preparados hoy.",
    price: 2800,
    pickupTime: "18:00 a 19:00",
    distance: "0.4 km",
    quantity: 3,
    address: "Peatonal Sarmiento 80",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80",
    status: "Activo"
  },
  {
    id: "p9",
    shopName: "Rotisería Don Luis",
    category: "Comida preparada",
    title: "Docena de Empanadas Variadas",
    description: "Empanadas horneadas hoy (carne, jamón y queso, humita, verdura). Se entregan a temperatura ambiente listas para calentar.",
    price: 3200,
    pickupTime: "21:00 a 22:00",
    distance: "1.2 km",
    quantity: 1,
    address: "Calle Belgrano 345",
    image: "/empanadas.png",
    status: "Activo"
  },
  {
    id: "p10",
    shopName: "Kiosko El Sol",
    category: "Café/Merienda",
    title: "Pack de Alfajores Artesanales",
    description: "Exquisitos alfajores de chocolate y dulce de leche de elaboración local, ideales para regalarse una dulce tentación.",
    price: 3000,
    pickupTime: "18:00 a 21:00",
    distance: "1.5 km",
    quantity: 2,
    address: "Esquina Rivadavia y Colón",
    image: "/alfajores.png",
    status: "Activo"
  }
];

const initialStats = {
  packsSold: 128,
  foodRescuedKg: 96.0,
  savingsGenerated: 320000,
  partnerShops: 24,
  registeredUsers: 850
};

export function AppProvider({ children }) {
  const [packs, setPacks] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("up_packs_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map(p => p.price === undefined ? { ...p, price: p.discountPrice || p.originalPrice || 2500 } : p);
      }
      return initialPacks;
    }
    return initialPacks;
  });

  const [reservations, setReservations] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("up_reservations_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map(r => r.price === undefined ? { ...r, price: r.discountPrice || 2500 } : r);
      }
      return [];
    }
    return [];
  });

  const [stats, setStats] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("up_stats_v2");
      return saved ? JSON.parse(saved) : initialStats;
    }
    return initialStats;
  });

  const [currentRole, setCurrentRole] = useState("landing"); // landing, consumer, merchant

  // Save states to localStorage on change
  useEffect(() => {
    localStorage.setItem("up_packs_v2", JSON.stringify(packs));
  }, [packs]);

  useEffect(() => {
    localStorage.setItem("up_reservations_v2", JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem("up_stats_v2", JSON.stringify(stats));
  }, [stats]);

  // Actions
  const reservePack = (packId) => {
    let selectedPack = null;
    
    // Update pack quantity
    setPacks((prevPacks) =>
      prevPacks.map((pack) => {
        if (pack.id === packId && pack.quantity > 0) {
          selectedPack = pack;
          const newQty = pack.quantity - 1;
          return {
            ...pack,
            quantity: newQty,
            status: newQty === 0 ? "Agotado" : pack.status
          };
        }
        return pack;
      })
    );

    if (selectedPack) {
      const saving = selectedPack.price * 1.5; // Simulate that they saved 1.5x what they paid compared to normal food
      const weightEst = 0.75; // average weight of 750g per pack
      const reservationCode = `UP-${Math.floor(1000 + Math.random() * 9000)}`;

      const newReservation = {
        code: reservationCode,
        packId: selectedPack.id,
        packTitle: selectedPack.title,
        shopName: selectedPack.shopName,
        category: selectedPack.category,
        price: selectedPack.price,
        pickupTime: selectedPack.pickupTime,
        address: selectedPack.address,
        reservedAt: new Date().toISOString(),
        status: "Pendiente de retiro"
      };

      setReservations((prev) => [newReservation, ...prev]);

      setStats((prevStats) => ({
        ...prevStats,
        packsSold: prevStats.packsSold + 1,
        foodRescuedKg: parseFloat((prevStats.foodRescuedKg + weightEst).toFixed(2)),
        savingsGenerated: Math.round(prevStats.savingsGenerated + saving)
      }));

      return newReservation;
    }
    return null;
  };

  const addPack = (newPackData) => {
    const newPack = {
      id: `p-${Date.now()}`,
      shopName: newPackData.shopName || "Mi Comercio",
      address: newPackData.address || "Dirección Comercio",
      status: newPackData.quantity > 0 ? "Activo" : "Agotado",
      distance: "1.0 km",
      image: newPackData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      ...newPackData
    };

    setPacks((prev) => [newPack, ...prev]);
  };

  const updatePack = (updatedPack) => {
    setPacks((prev) =>
      prev.map((pack) => (pack.id === updatedPack.id ? {
        ...updatedPack,
        status: updatedPack.quantity > 0 ? "Activo" : "Agotado"
      } : pack))
    );
  };

  const toggleStock = (packId) => {
    setPacks((prev) =>
      prev.map((pack) => {
        if (pack.id === packId) {
          const isAgotado = pack.status === "Agotado";
          return {
            ...pack,
            status: isAgotado ? "Activo" : "Agotado",
            quantity: isAgotado ? (pack.quantity === 0 ? 3 : pack.quantity) : 0
          };
        }
        return pack;
      })
    );
  };

  const deletePack = (packId) => {
    setPacks((prev) => prev.filter((pack) => pack.id !== packId));
  };

  const resetAllData = () => {
    if (confirm("¿Estás seguro de que querés reiniciar todos los datos a sus valores iniciales?")) {
      setPacks(initialPacks);
      setReservations([]);
      setStats(initialStats);
      setCurrentRole("landing");
    }
  };

  return (
    <AppContext.Provider
      value={{
        packs,
        reservations,
        stats,
        currentRole,
        setCurrentRole,
        reservePack,
        addPack,
        updatePack,
        toggleStock,
        deletePack,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
