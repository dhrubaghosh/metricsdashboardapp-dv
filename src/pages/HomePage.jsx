import React from "react";
import Header from "../components/Header";
import KPIDashboard from "../components/KPIDashboard";

export default function HomePage() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 overflow-hidden">
        <KPIDashboard />
      </main>
    </div>
  );
}
