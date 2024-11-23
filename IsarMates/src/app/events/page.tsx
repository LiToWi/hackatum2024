"use client";

import React, { useState } from "react";
import eventsData from "@/data/events.json"; // Import events data
import Link from "next/link";
import { FaUser } from "react-icons/fa"; // Import person icon from React Icons

export default function EventsPage() {
  const [events, setEvents] = useState(eventsData.events); // Manage events state
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    image: "",
    duration: "",
    max_participants: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;

    // Prevent negative numbers for participants
    if (e.target.name === "max_participants") {
      value = Math.max(0, parseInt(value) || 0).toString();
    }

    setNewEvent({ ...newEvent, [e.target.name]: value });
  };

  // Add new event
  const handleAddEvent = () => {
    const eventWithId = {
      ...newEvent,
      event_id: events.length + 1, // Generate a new ID
    };
    setEvents([...events, eventWithId]); // Update events state
    setShowModal(false); // Close the modal
  };

  return (
    <div className="container mx-auto py-10">
      {/* Title Section */}
      <div className="relative flex items-center justify-center mb-6">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>
        <button
          onClick={() => setShowModal(true)}
          className="absolute right-0 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
        >
          + Add New Event
        </button>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.event_id}
            className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition"
          >
            {/* Event Image */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* Event Title */}
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>

            {/* Date, Time, and Counter */}
            <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
              {/* Date and Time on the Left */}
              <span>
                {event.date} at {event.time}
              </span>

              {/* Counter and Icon on the Right */}
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-500 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM21 21a9 9 0 10-18 0h18z"
                  />
                </svg>
                <span>
                  {event.participants}/{event.max_participants}
                </span>
              </div>
            </div>

            {/* View Details Button */}
            <Link href={`/events/${event.event_id}`}>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    

      {/* Modal for Adding New Event */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <textarea
                name="description"
                placeholder="Event Description"
                value={newEvent.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              ></textarea>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={newEvent.location}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="time"
                name="time"
                value={newEvent.time}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g., 2 hours)"
                value={newEvent.duration}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="max_participants"
                placeholder="Max Participants"
                value={newEvent.max_participants}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newEvent.image}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
