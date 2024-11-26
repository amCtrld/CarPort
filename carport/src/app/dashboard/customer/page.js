'use client';

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
      <p>Welcome, Customer! Track your shipments here.</p>
      <div className="mt-6">
        <button
          onClick={() => alert("Feature coming soon!")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Track Shipments
        </button>
      </div>
    </div>
  );
}
