'use client';

import { useContext, useState } from "react";
import { DashboardContext } from "../layout";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { shipments, setShipments, activeShipments, inStock } = useContext(DashboardContext);
  const [pendingClearances, setPendingClearances] = useState(
    shipments.filter((shipment) => !shipment.cleared).length
  );

  const router = useRouter();

  const handleClearanceChange = (index) => {
    const updatedShipments = [...shipments];
    updatedShipments[index].cleared = !updatedShipments[index].cleared;
    setShipments(updatedShipments);

    // Update Pending Clearance Count
    setPendingClearances(updatedShipments.filter((s) => !s.cleared).length);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-fixed p-8"
      style={{
        backgroundImage: "url('/images/dashbg.jpg')",
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

      {/* Go To Inventory Button */}
      <button
        onClick={() => router.push("/dashboard/inventory")}
        className="mb-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Go To Inventory
      </button>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-sm text-gray-700">Active Shipments</h2>
            <p className="text-3xl font-bold">{activeShipments}</p>
          </div>
          <span className="text-blue-600 text-6xl">🚢</span>
        </div>

        <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-sm text-gray-700">Pending Clearances</h2>
            <p className="text-3xl font-bold">{pendingClearances}</p>
          </div>
          <span className="text-yellow-500 text-6xl">📦</span>
        </div>

        <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-sm text-gray-700">In Stock</h2>
            <p className="text-3xl font-bold">{inStock}</p>
          </div>
          <span className="text-green-600 text-6xl">🚗</span>
        </div>
      </div>

      {/* Active Shipments Table */}
      <h2 className="text-2xl text-white mb-4">Active Shipments</h2>
      <div className="overflow-x-auto bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Make</th>
              <th className="border border-gray-300 p-2">Model</th>
              <th className="border border-gray-300 p-2">Year</th>
              <th className="border border-gray-300 p-2">Mileage</th>
              <th className="border border-gray-300 p-2">Buying Price</th>
              <th className="border border-gray-300 p-2">Selling Price</th>
              <th className="border border-gray-300 p-2">Clearance</th>
            </tr>
          </thead>
          <tbody>
            {shipments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No active shipments.
                </td>
              </tr>
            ) : (
              shipments.map((shipment, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{shipment.make}</td>
                  <td className="border border-gray-300 p-2">{shipment.model}</td>
                  <td className="border border-gray-300 p-2">{shipment.year}</td>
                  <td className="border border-gray-300 p-2">{shipment.mileage}</td>
                  <td className="border border-gray-300 p-2">{shipment.buyingPrice}</td>
                  <td className="border border-gray-300 p-2">{shipment.sellingPrice}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="checkbox"
                      checked={shipment.cleared || false}
                      onChange={() => handleClearanceChange(index)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
