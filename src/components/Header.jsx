import React, { useState } from "react";
import logo from "../assets/ninja.jpg";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <header className="relative bg-tcsBlue shadow flex items-center justify-between px-6 py-4 rounded-lg mb-4">
        <div className="flex items-center space-x-2 z-10">
          <img
            src={logo}
            alt="Logo"
            onClick={handleLogoClick}
            className="h-10 w-10 rounded shadow-md object-cover cursor-pointer"
          />
        </div>

        <h1 className="absolute inset-x-0 text-center text-2xl font-bold text-white">
          Metrics Dashboard
        </h1>
      </header>
    </>
  );
}
