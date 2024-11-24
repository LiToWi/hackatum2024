"use client";
import { useRouter } from "next/navigation"; // Correct import for useRouter in "use client" context

export default function DashboardFeature() {
  const router = useRouter(); // Initialize the router instance

  return (
    <div className="w-screen h-screen overflow-hidden grid grid-cols-2 grid-rows-2 gap-4 p-4 h-[95%]">
      {/* Discover Events */}
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <button
          onClick={() => router.push("/events")}
          className="relative w-full h-full bg-cover bg-center text-white transition-transform duration-300 hover:scale-105"
          style={{
            backgroundImage: "url('/start-images/wave.jpg')", // Replace with your image path
          }}
        >
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold z-10">Discover Events</span>
          </div>
        </button>
      </div>

      {/* Claim NFT Rewards */}
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <button
          onClick={() => router.push("/nfts")}
          className="relative w-full h-full bg-cover bg-center text-white transition-transform duration-300 hover:scale-105"
          style={{
            backgroundImage: "url('/start-images/rewards.jpeg')", // Replace with your image path
          }}
        >
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold z-10">Claim NFT Rewards</span>
          </div>
        </button>
      </div>

      {/* Connect with Citizens */}
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <button
          onClick={() => alert("Connect with Citizens clicked")}
          className="relative w-full h-full bg-cover bg-center text-white transition-transform duration-300 hover:scale-105"
          style={{
            backgroundImage: "url('/start-images/connections.jpeg')", // Replace with your image path
          }}
        >
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold z-10">Connect with Citizens</span>
          </div>
        </button>
      </div>

      {/* Get Help */}
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <button
          onClick={() => alert("Get Help clicked")}
          className="relative w-full h-full bg-cover bg-center text-white transition-transform duration-300 hover:scale-105"
          style={{
            backgroundImage: "url('/start-images/helping_hands.jpeg')", // Replace with your image path
          }}
        >
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold z-10">Get Help & Info</span>
          </div>
        </button>
      </div>
    </div>
  );
}

