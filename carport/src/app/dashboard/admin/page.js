'use client';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! Manage the system here.</p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => alert("Feature: View System Logs coming soon!")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View System Logs
        </button>
        <button
          onClick={() => alert("Feature: Manage Users coming soon!")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Manage Users
        </button>
      </div>
    </div>
  );
}
