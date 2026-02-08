import React from "react";
import logo from "../assets/ninja.jpg";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMonth } from "../context/MonthContext";

export default function Header() {
  const navigate = useNavigate();
  const { selectedMonth, setSelectedMonth, months } = useMonth();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handlePrevious = () => {
    const currentIndex = months.indexOf(selectedMonth);
    if (currentIndex < months.length - 1) {
      setSelectedMonth(months[currentIndex + 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = months.indexOf(selectedMonth);
    if (currentIndex > 0) {
      setSelectedMonth(months[currentIndex - 1]);
    }
  };

  const currentIndex = months.indexOf(selectedMonth);
  const isFirstMonth = currentIndex === 0;
  const isLastMonth = currentIndex === months.length - 1;

  return (
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
        Quality Engineering Dashboard
      </h1>
      <div className="flex items-center space-x-3 z-10">
        <button
          onClick={handlePrevious}
          disabled={isLastMonth}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg p-2 transition"
          title="Previous Month"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 min-w-[140px] text-center">
          <p className="text-white font-semibold text-sm">{selectedMonth}</p>
        </div>
        <button
          onClick={handleNext}
          disabled={isFirstMonth}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg p-2 transition"
          title="Next Month"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>
    </header>
  );
}
