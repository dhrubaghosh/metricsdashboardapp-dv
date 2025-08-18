import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KPIDashboard from "../components/KPIDashboard";




export default function HomePage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col p-2">
        <Header />
        <main className="flex-1 flex flex-col">
          <KPIDashboard />
        </main>
        <Footer />
      </div>
  
  );
}
