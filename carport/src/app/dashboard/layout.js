'use client';

import { useState, createContext } from "react";
import { useRouter } from "next/navigation";

// Create Context for Shared State
export const DashboardContext = createContext();

export default function DashboardLayout({ children }) {
  const router = useRouter();

  // Shared States for Shipments and Inventory
  const [shipments, setShipments] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [activeShipments, setActiveShipments] = useState(0);
  const [inStock, setInStock] = useState(0);

  return (
    <DashboardContext.Provider
      value={{
        shipments,
        setShipments,
        inventory,
        setInventory,
        activeShipments,
        setActiveShipments,
        inStock,
        setInStock,
      }}
    >
      <div className="min-h-screen flex flex-col">
        {/* Header Section */}
        <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
          <h1>CarPort Dashboard</h1>
          <button
            onClick={() => router.push("/")}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </DashboardContext.Provider>
  );
}
