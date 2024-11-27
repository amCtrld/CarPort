'use client';

import { useState, useContext } from "react";
import { DashboardContext } from "../layout";
import { useRouter } from "next/navigation";

export default function InventoryPage() {
  const {
    inventory,
    setInventory,
    inStock,
    setInStock,
    shipments,
    setShipments,
    activeShipments,
    setActiveShipments,
  } = useContext(DashboardContext);

  const router = useRouter();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    buyingPrice: "",
    sellingPrice: "",
    action: "stock", // Default action is to add to stock
    images: [],
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file uploads for vehicle images
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  // Handle adding or editing a vehicle
  const handleAddVehicle = () => {
    if (formData.action === "stock") {
      setInventory([...inventory, formData]);
      setInStock(inStock + 1);
    } else if (formData.action === "ship") {
      setShipments([...shipments, formData]);
      setActiveShipments(activeShipments + 1);
    }

    setFormData({
      make: "",
      model: "",
      year: "",
      mileage: "",
      buyingPrice: "",
      sellingPrice: "",
      action: "stock",
      images: [],
    });
    setIsFormVisible(false);
  };

  // Handle editing an existing vehicle
  const handleEdit = (index) => {
    const carToEdit = inventory[index];
    setFormData({ ...carToEdit, action: "stock" });
    setIsFormVisible(true);

    // Remove the car temporarily to avoid duplication
    setInventory(inventory.filter((_, i) => i !== index));
    setInStock(inStock - 1);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-fixed p-8"
      style={{
        backgroundImage: "url('/images/dashbg.jpg')",
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-8">Inventory</h1>

      {/* Go To Dashboard Button */}
      <button
        onClick={() => router.push("/dashboard/admin")}
        className="mb-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Go To Dashboard
      </button>

      {/* Inventory Table */}
      <div className="overflow-x-auto bg-white bg-opacity-80 p-4 rounded-lg shadow-lg mb-8">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Make</th>
              <th className="border border-gray-300 p-2">Model</th>
              <th className="border border-gray-300 p-2">Year</th>
              <th className="border border-gray-300 p-2">Mileage</th>
              <th className="border border-gray-300 p-2">Buying Price</th>
              <th className="border border-gray-300 p-2">Selling Price</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No vehicles in stock.
                </td>
              </tr>
            ) : (
              inventory.map((car, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{car.make}</td>
                  <td className="border border-gray-300 p-2">{car.model}</td>
                  <td className="border border-gray-300 p-2">{car.year}</td>
                  <td className="border border-gray-300 p-2">{car.mileage}</td>
                  <td className="border border-gray-300 p-2">{car.buyingPrice}</td>
                  <td className="border border-gray-300 p-2">{car.sellingPrice}</td>
                  <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 px-2 py-1 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setInventory(inventory.filter((_, i) => i !== index))
                      }
                      className="bg-red-500 px-2 py-1 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Vehicle Button */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="mb-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        {isFormVisible ? "Close Form" : "Add Vehicle"}
      </button>

      {/* Add Vehicle Form */}
      {isFormVisible && (
        <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add Vehicle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Buying Price"
              name="buyingPrice"
              value={formData.buyingPrice}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Selling Price"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
            <select
              name="action"
              value={formData.action}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            >
              <option value="stock">Add to Stock</option>
              <option value="ship">Add to Shipments</option>
            </select>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="p-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleAddVehicle}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
