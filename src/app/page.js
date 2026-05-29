"use client";

import React, { useState } from "react";
import { AppProvider, useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import ConsumerHome from "../components/ConsumerHome";
import MerchantDashboard from "../components/MerchantDashboard";
import ImpactDashboard from "../components/ImpactDashboard";
import PackDetail from "../components/PackDetail";
import ReservationModal from "../components/ReservationModal";
import Footer from "../components/Footer";

function AppContent() {
  const { currentRole } = useApp();
  
  // Modals and Details states
  const [selectedPack, setSelectedPack] = useState(null);
  const [activeReservation, setActiveReservation] = useState(null);

  const handleSelectPack = (pack) => {
    setSelectedPack(pack);
  };

  const handleReserveSuccess = (reservation) => {
    setSelectedPack(null); // close detail modal
    setActiveReservation(reservation); // open ticket confirmation modal
  };

  const renderActiveView = () => {
    switch (currentRole) {
      case "landing":
        return <LandingPage />;
      case "consumer":
        return <ConsumerHome onSelectPack={handleSelectPack} />;
      case "merchant":
        return <MerchantDashboard />;
      case "impact":
        return <ImpactDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-all duration-300">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {renderActiveView()}
      </main>

      <Footer />

      {/* Detail Modal Overlay */}
      {selectedPack && (
        <PackDetail
          pack={selectedPack}
          onClose={() => setSelectedPack(null)}
          onReserveSuccess={handleReserveSuccess}
        />
      )}

      {/* Ticket Confirmation Modal Overlay */}
      {activeReservation && (
        <ReservationModal
          reservation={activeReservation}
          onClose={() => setActiveReservation(null)}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
