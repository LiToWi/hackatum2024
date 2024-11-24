"use client";

import { useParams } from "next/navigation";
import eventsData from "@/data/events.json";
import { useWallet } from "@solana/wallet-adapter-react";

export default function EventDetailsPage() {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const { publicKey } = useWallet();
  const eventId = Array.isArray(id) ? id[0] : id;
  const event = eventsData.events.find((event) => event.event_id === parseInt(eventId || "", 10));

  if (!event) {
    return <div className="text-center mt-10 text-gray-500">Event not found.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 lg:px-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image on the Left */}
        <div className="flex-shrink-0 lg:w-1/2">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Details on the Right */}
        <div className="flex-grow lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <div className="text-gray-300 mb-6">
          <p className="text-lg">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-lg">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-lg">
              <strong>Time:</strong> {event.time}
            </p>
            <p className="text-lg">
              <strong>Duration:</strong> {event.duration}
            </p>
            <p className="text-lg">
              <strong>Participants:</strong> {event.participants}/{event.max_participants}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Sign-Up Button */}
          <div className="text-center">
            <button
              className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-600 shadow-md transition duration-200"
              onClick={() => {
                if (!publicKey) {
                  console.log("Please connect your wallet first."); 
                }
                else{
                if (!localStorage.getItem("registeredEvents")) {
                  localStorage.setItem("registeredEvents", "" + event.event_id);
                }
                else {
                  localStorage.setItem("registeredEvents", localStorage.getItem("registeredEvents") + "," + event.event_id);
                }
              }
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
