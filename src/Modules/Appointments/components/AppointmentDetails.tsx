import React from "react";
import { Select, TextInput } from "@mantine/core";
import { Calendar, Clock } from "lucide-react";

interface AppointmentDetailsProps {
  appointmentType: string;
  date: string;
  time: string;
  paymentStatus: string;
  onAppointmentTypeChange: (value: string | null) => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onPaymentStatusChange: (value: string | null) => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointmentType,
  date,
  time,
  paymentStatus,
  onAppointmentTypeChange,
  onDateChange,
  onTimeChange,
  onPaymentStatusChange,
}) => {
  const appointmentTypes = [
    { value: "follow-up", label: "Follow-up" },
    { value: "consultation", label: "Consultation" },
    { value: "check-up", label: "Check-up" },
    { value: "treatment", label: "Treatment" },
  ];

  const paymentStatuses = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <h3 className="text-base font-semibold text-gray-900">
        Appointment Details
      </h3>

      {/* Appointment Type */}
      <div>
        <Select
          label={
            <span className="text-sm font-medium text-gray-900">
              Appointment Type
            </span>
          }
          placeholder="Choose appointment type"
          data={appointmentTypes}
          value={appointmentType}
          onChange={onAppointmentTypeChange}
          radius="md"
          size="lg"
          searchable
          clearable
          styles={{
            input: {
              borderColor: "#e5e7eb",
            },
            label: {
              marginBottom: "8px",
            },
          }}
        />
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-900 block mb-2">
            Date
          </label>
          <div className="relative">
            <TextInput
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.currentTarget.value)}
              placeholder="dd-mm-yyyy"
              radius="md"
              size="lg"
              styles={{
                input: {
                  borderColor: "#e5e7eb",
                },
              }}
            />
            <Calendar
              size={20}
              className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-900 block mb-2">
            Time
          </label>
          <div className="relative">
            <TextInput
              type="time"
              value={time}
              onChange={(e) => onTimeChange(e.currentTarget.value)}
              placeholder="--:--"
              radius="md"
              size="lg"
              styles={{
                input: {
                  borderColor: "#e5e7eb",
                },
              }}
            />
            <Clock
              size={20}
              className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div>
        <Select
          label={
            <span className="text-sm font-medium text-gray-900">
              Payment Status
            </span>
          }
          placeholder="Choose payment status"
          data={paymentStatuses}
          value={paymentStatus}
          onChange={onPaymentStatusChange}
          radius="md"
          size="lg"
          searchable
          clearable
          styles={{
            input: {
              borderColor: "#e5e7eb",
            },
            label: {
              marginBottom: "8px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default AppointmentDetails;
