"use client";
import { useRouter } from "next/navigation"; // Correct import for useRouter in "use client" context

export default function DashboardFeature() {
  const router = useRouter(); // Initialize the router instance

  return (
    <div className="container mx-auto py-10">
      {/* Headline */}
      <h1 className="text-5xl font-bold mb-8 text-center">IsarMates</h1>
      {/* Welcome Message */}
      <p className="text-lg text-gray-500 mb-12 text-center">
        Welcome to IsarMates. This is your platform to...
      </p>
      {/* Grid of Larger Buttons */}
      <div className="grid grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Discover Events */}
        <button
          onClick={() => router.push("/events")}
          className="flex items-center justify-center bg-white border border-pink-600 rounded-xl shadow-lg p-20 text-center text-2xl font-bold hover:bg-blue-300 transition-all"
        >
          Discover Events
        </button>
        {/* Claim NFT Rewards */}
        <button
          onClick={() => router.push("/nfts")}
          //onClick={() => alert("Claim Rewards clicked")}
          className="flex items-center justify-center bg-white border border-pink-600 rounded-xl shadow-lg p-20 text-center text-2xl font-bold hover:bg-blue-300 transition-all"
        >
          Claim NFT Rewards
        </button>
        {/* Connect with Citizens */}
        <button
          onClick={() => alert("Connect with Citizens clicked")}
          className="flex items-center justify-center bg-white border border-pink-600 rounded-xl shadow-lg p-20 text-center text-2xl font-bold hover:bg-blue-300 transition-all"
        >
          Connect with Citizens
        </button>
        {/* Get Help */}
        <button
          onClick={() => alert("Get Help clicked")}
          className="flex items-center justify-center bg-white border border-pink-600 rounded-xl shadow-lg p-20 text-center text-2xl font-bold hover:bg-blue-300 transition-all"
        >
          Get Help
        </button>
      </div>
    </div>
  );
}
