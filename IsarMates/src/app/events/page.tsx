"use client";

import React, { useState, useRef } from "react";
import eventsData from "@/data/events.json";
import Link from "next/link";
import { FaUser, FaTree, FaUtensils, FaHome } from "react-icons/fa";

interface Event {
  event_id: number;
  title: string;
  category: string[];
  description: string;
  location: string;
  date: string;
  time: string;
  image: string;
  duration: string;
  participants: number;
  max_participants: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(eventsData.events);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const modalRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    { name: "Outdoor", icon: <FaTree /> },
    { name: "Indoor", icon: <FaHome /> },
    { name: "Food", icon: <FaUtensils /> },
  ];

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // updated block to combine filter and search 
  const filteredEvents = events.filter((event) => {
    const matchesSearch = searchTerm
      ? event.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory =
      selectedCategories.length > 0
        ? event.category.some((category) =>
            selectedCategories.includes(category)
          )
        : true;

    return matchesSearch && matchesCategory;
  });

  const closeModalOnOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowFilterModal(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      {/* Title Section */}
      <div className="relative flex items-center justify-center mb-6">
        <h1 className="absolute left-0 text-4xl font-bold">Upcoming Events</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered input-lg flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setShowFilterModal(true)}
            className="btn-lg text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Filter
          </button>
        </div>
        <button
          onClick={() => alert("Add event functionality coming soon!")}
          className="absolute right-0 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
        >
          + Add New Event
        </button>
      </div>

      {/* Event Grid */}
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

      {/* Filter Modal */}
      {showFilterModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModalOnOutsideClick}
        >
          <div
            ref={modalRef}
            className="bg-gray-700 rounded-lg p-6 w-full max-w-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Filter by Category</h2>
            <div className="space-y-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => toggleCategory(category.name)}
                  className={`flex items-center justify-between w-full py-2 px-4 rounded-lg border ${
                    selectedCategories.includes(category.name)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    {category.icon}
                    <span>{category.name}</span>
                  </span>
                  {selectedCategories.includes(category.name) && <span>✔</span>}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowFilterModal(false)}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}