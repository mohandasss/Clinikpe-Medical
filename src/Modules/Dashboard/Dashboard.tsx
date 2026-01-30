import React, { useState } from "react";
import DashboardStats from "./components/DashboardStats";
import FilterChips from "./components/ScrollableChips";
import AppointmentCard from "./components/AppointmentCard";

const Dashboard = () => {
  const [activeDoctor, setActiveDoctor] = useState("all");

  const doctors = [
    { label: "All Doctors", value: "all" },
    { label: "Dr. Smith", value: "smith" },
    { label: "Dr. Johnson", value: "johnson" },
    { label: "Dr. Williams", value: "williams" },
    { label: "Dr. Brown", value: "brown" },
    { label: "Dr. Jones", value: "jones" },
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
      patientName: "Sarah Ahmed",
      age: 28,
      gender: "Female",
      date: "02 Jan",
      time: "3:30 PM",
      type: "Consultation",
      status: "Upcoming" as const,
      paymentStatus: "Payment: Completed",
      phoneNumber: "+1234567891",
    },
    {
      id: "3",
      patientName: "John Smith",
      age: 35,
      gender: "Male",
      date: "05 Jan",
      time: "10:00 AM",
      type: "Check-up",
      status: "Upcoming" as const,
      paymentStatus: "Payment: Pending",
      phoneNumber: "+1234567892",
    },
  ];

  const handleCancel = (id: string) => {
    console.log("Cancel appointment:", id);
  };

  const handleMarkComplete = (id: string) => {
    console.log("Mark complete:", id);
  };

  return (
    <div className="w-full space-y-2">
      <DashboardStats />
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Recent Appointments</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">see all</button>
        </div>

        <FilterChips 
          filters={doctors}
          activeTab={activeDoctor}
          onCategoryChange={setActiveDoctor}
        />
      </div>

      {/* Appointment Cards Stack */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onCancel={handleCancel}
            onMarkComplete={handleMarkComplete}
          />
        ))}
      </div>
    </div> 
  );
};

export default Dashboard;
