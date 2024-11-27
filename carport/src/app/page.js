'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState([
    // Sample data; replace with admin-added data later
    { make: "Toyota", model: "Corolla", year: 2022, price: "$20,000" },
    { make: "Land Rover", model: "Defender", year: 2021, price: "$60,000" },
    { make: "Honda", model: "Civic", year: 2023, price: "$25,000" },
  ]);

  const handleSearch = () => {
    const matches = vehicles.filter(
      (vehicle) => vehicle.make.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matches.length === 0) {
      alert(
        `No matches found. Available makes: ${[
          ...new Set(vehicles.map((v) => v.make)),
        ].join(", ")}`
      );
    } else {
      setVehicles(matches);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-fixed flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/logincarbg.jpg')",
      }}
    >
      {/* Navbar */}
      <div className="absolute top-4 right-4 flex gap-4">
        <button
          onClick={() => router.push("/signup")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </div>

      {/* Hero Section */}
      <h1 className="text-5xl font-bold text-white mb-8">Check out our latest</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-xl font-bold">{vehicle.make}</h2>
            <p>{vehicle.model} - {vehicle.year}</p>
            <p className="text-green-600 font-bold">{vehicle.price}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Looking for something specific?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}
