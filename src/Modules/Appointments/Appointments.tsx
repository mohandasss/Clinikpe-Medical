import React, { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import FilterChips from "../Dashboard/components/ScrollableChips";
import AppointmentCard from "../Dashboard/components/AppointmentCard";

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDoctor, setActiveDoctor] = useState("all");

  const doctors = [
    { label: "Dr. D.R.K Roy", value: "roy" },
    { label: "Dr. Sarah Roy", value: "sarah" },
    { label: "Dr. Anup K", value: "anup" },
    { label: "Dr. Brown", value: "brown" },
  ];

  const appointments = [
    {
      id: "1",
      patientName: "Aji Rahaman",
      age: 23,
      gender: "Male",
      date: "31 Dec",
      time: "2:00 PM",
      type: "Follow-up",
      status: "Upcoming" as const,
      paymentStatus: "Payment: Pending",
      phoneNumber: "+1234567890",
    },
    {
      id: "2",
      patientName: "Ayan Paul",
      age: 24,
      gender: "Male",
      date: "31 Dec",
      time: "2:00 PM",
      type: "Follow-up",
      status: "Upcoming" as const,
      paymentStatus: "Payment: Pending",
      phoneNumber: "+1234567891",
    },
    {
      id: "3",
      patientName: "Sarah Ahmed",
      age: 28,
      gender: "Female",
      date: "02 Jan",
      time: "3:30 PM",
      type: "Consultation",
      status: "Upcoming" as const,
      paymentStatus: "Payment: Completed",
      phoneNumber: "+1234567892",
    },
  ];

  const filteredAppointments = appointments.filter((apt) =>
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancel = (id: string) => {
    console.log("Cancel appointment:", id);
  };

  const handleMarkComplete = (id: string) => {
    console.log("Mark complete:", id);
  };

  const handleAddAppointment = () => {
    console.log("Add new appointment");
  };

  return (
    <div className="w-full relative ">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Filter size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="mb-6">
        <FilterChips
          filters={doctors}
          activeTab={activeDoctor}
          onCategoryChange={setActiveDoctor}
        />
      </div>

      {/* Appointment Cards */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={handleCancel}
              onMarkComplete={handleMarkComplete}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No appointments found</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleAddAppointment}
        className="fixed bottom-24 right-4 w-16 h-16     bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition z-40"
      >
        <Plus size={40} />
      </button>
    </div>
  );
};

export default Appointments;