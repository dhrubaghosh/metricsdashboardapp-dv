import React, { useState } from "react";
import logo from "../assets/ninja.jpg";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [monthOffset, setMonthOffset] = useState(0);

  // 12 months: Jan 2026 to Feb 2025
  const months = [
    "Jan 2026",
    "Dec 2025",
    "Nov 2025",
    "Oct 2025",
    "Sep 2025",
    "Aug 2025",
    "Jul 2025",
    "Jun 2025",
    "May 2025",
    "Apr 2025",
    "Mar 2025",
    "Feb 2025",
  ];

  const handleLogoClick = () => {
    navigate("/");
  };

  const handlePrevious = () => {
    // Go back 3 months
    setMonthOffset((prev) => (prev < months.length - 3 ? prev + 3 : prev));
  };

  const handleNext = () => {
    // Go forward 3 months
    setMonthOffset((prev) => (prev >= 3 ? prev - 3 : prev));
  };

  const currentMonth = months[monthOffset];

  // Store monthOffset in global state so KPIDashboard can access it
  React.useEffect(() => {
    window.currentMonthOffset = monthOffset;
  }, [monthOffset]);

  return (
    <>
      <header className="relative bg-tcsBlue shadow flex items-center justify-between px-6 py-4 rounded-lg mb-4">
        {/* LEFT: Logo */}
        <div className="flex items-center space-x-2 z-10">
          <img
            src={logo}
            alt="Logo"
            onClick={handleLogoClick}
            className="h-10 w-10 rounded shadow-md object-cover cursor-pointer"
          />
        </div>

        {/* CENTER: Title */}
        <h1 className="absolute inset-x-0 text-center text-2xl font-bold text-white">
          Metrics Dashboard
        </h1>

        {/* RIGHT: Month Shifter with Arrows (3-month shift) */}
        <div className="flex items-center space-x-3 z-10">
          {/* Left Arrow - Previous 3 months */}
          <button
            onClick={handlePrevious}
            disabled={monthOffset >= months.length - 3}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg p-2 transition"
            title="Previous 3 Months"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>

          {/* Current Month Display */}
          <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 min-w-[140px] text-center">
            <p className="text-white font-semibold text-sm">{currentMonth}</p>
          </div>

          {/* Right Arrow - Next 3 months */}
          <button
            onClick={handleNext}
            disabled={monthOffset === 0}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg p-2 transition"
            title="Next 3 Months"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </header>
    </>
  );
}
