import React from "react";
import { Calendar, Briefcase, Phone, X, CheckCircle } from "lucide-react";

interface AppointmentData {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  date: string;
  time: string;
  type: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  paymentStatus: string;
  phoneNumber?: string;
}

interface AppointmentCardProps {
  appointment: AppointmentData;
  onCancel?: (id: string) => void;
  onMarkComplete?: (id: string) => void;
}

export default function AppointmentCard({
  appointment,
  onCancel,
  onMarkComplete,
}: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {appointment.patientName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {appointment.age} yrs • {appointment.gender}
          </p>
        </div>
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-2 ${getStatusColor(
            appointment.status
          )}`}
        >
          {appointment.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-1 border-gray-200 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-700">
            <Calendar size={18} className="text-gray-600" />
            <span className="text-sm">{appointment.date}, {appointment.time}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
             
            </div> */}
            <span className="text-sm font-medium text-orange-600">
              {appointment.paymentStatus}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-700">
            <Briefcase size={18} className="text-gray-600" />
            <span className="text-sm">Type: {appointment.type}</span>
          </div>
          {appointment.phoneNumber && (
            <button className=" text-blue-600  p-4 rounded-full hover:bg-blue-200 transition">
              <Phone size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="grid  border-t grid-cols-2 gap-3 pt-4">
        <button
          onClick={() => onCancel?.(appointment.id)}
          className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition"
        >
          <X size={18} />
          Cancel
        </button>
        <button
          onClick={() => onMarkComplete?.(appointment.id)}
          className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-400 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          <CheckCircle size={18} />
           Complete
        </button>
      </div>
    </div>
  );
}