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
  const [showModal, setShowModal] = useState(false); // Add Event modal visibility state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filterModalRef = useRef<HTMLDivElement | null>(null);
  const addEventModalRef = useRef<HTMLDivElement | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;

    if (e.target.name === "max_participants") {
      value = Math.max(0, parseInt(value) || 0).toString();
    }

    setNewEvent({ ...newEvent, [e.target.name]: value });
  };

  



  const handleAddEvent = () => {
    const eventWithId = {
      ...newEvent,
      event_id: events.length + 1, // Generate a new ID
    };
    setEvents([...events, eventWithId]);
    setShowModal(false); // Close the modal
  };

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

  const closeModalOnOutsideClick = (
    e: React.MouseEvent<HTMLDivElement>,
    modalRef: React.RefObject<HTMLDivElement>,
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal(false);
    }
  };

  const isFormValid = (): boolean => {
    return (
      newEvent.title.trim() !== "" &&
      newEvent.description.trim() !== "" &&
      newEvent.location.trim() !== "" &&
      newEvent.date.trim() !== "" &&
      newEvent.time.trim() !== "" &&
      newEvent.duration.trim() !== "" &&
      newEvent.max_participants.trim() !== "" &&
      newEvent.image.trim() !== ""
    );
  };

  return (
    <div className="container mx-auto py-10">
      {/* Title Section */}
      <div className="flex justify-center mb-6">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>
      </div>
      <div className="relative flex items-center justify-center mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="btn-lg text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          + Add New Event
        </button>

        {/* Centered input field */}
        <div className="flex-grow max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered input-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShowFilterModal(true)}
          className="btn-lg text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </div>
      <br />

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
          onClick={(e) =>
            closeModalOnOutsideClick(e, filterModalRef, setShowFilterModal)
          }
        >
          <div
            ref={filterModalRef}
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

      {/* Modal for Adding New Event */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => closeModalOnOutsideClick(e, addEventModalRef, setShowModal)}
        >
          <div
            ref={addEventModalRef}
            className="bg-gray-700 rounded-lg p-6 w-full max-w-lg shadow-lg"
          >
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
                disabled={!isFormValid()}
                className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${
                  !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
