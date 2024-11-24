'use client'

import { FaUser } from "react-icons/fa";
import Link from "next/link";
import eventsData from "@/data/events.json";

export default function MyEvents() {
  const events = eventsData.events;

  const filteredEvents = events.filter((event) => {
    return localStorage.getItem("registeredEvents")?.includes(""+event.event_id);
  });

  if (events.length <= 0 || !localStorage.getItem("registeredEvents")) {
    return (
      <div className='flex mt-[10%] flex-col justify-center items-center'>
        <h1 className='text-2xl'> It´s quite empty here right now... Go and find an activity!</h1>
        <img className="w-[30%]" src='./Empty street-amico.png'/>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <div
          key={event.event_id}
          className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
          <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
            <span>
              {event.date} at {event.time}
            </span>
            <div className="flex items-center">
              <FaUser className="text-gray-500 mr-1" />
              <span>
                {event.participants}/{event.max_participants}
              </span>
            </div>
          </div>
          <Link href={`/events/${event.event_id}`}>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}

