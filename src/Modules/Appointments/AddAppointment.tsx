import React, { useState } from "react";
import { Button } from "@mantine/core";
import { colors } from "../../Constants/colors";
import SelectProvider from "./components/SelectProvider";
import PatientDetails from "./components/PatientDetails";
import AppointmentDetails from "./components/AppointmentDetails";

interface AppointmentForm {
  provider: string;
  patientName: string;
  age: string;
  gender: "male" | "female" | "other";
  appointmentType: string;
  date: string;
  time: string;
  paymentStatus: string;
}

const AddAppointment = () => {
  const [formData, setFormData] = useState<AppointmentForm>({
    provider: "",
    patientName: "",
    age: "",
    gender: "male",
    appointmentType: "",
    date: "",
    time: "",
    paymentStatus: "",
  });

  const handleSubmit = () => {
    console.log("Appointment Form Data:", formData);
  };

  return (
    <div className="w-full px-0">
      <div className="space-y-4 mt-0">
        {/* Select Provider */}
        <SelectProvider
          selectedProvider={formData.provider}
          onProviderChange={(value) =>
            setFormData({ ...formData, provider: value || "" })
          }
        />

        {/* Patient Details */}
        <PatientDetails
          patientName={formData.patientName}
          age={formData.age}
          gender={formData.gender}
          onPatientNameChange={(value) =>
            setFormData({ ...formData, patientName: value })
          }
          onAgeChange={(value) =>
            setFormData({ ...formData, age: value?.toString() || "" })
          }
          onGenderChange={(value) =>
            setFormData({ ...formData, gender: value })
          }
        />

        {/* Appointment Details */}
        <AppointmentDetails
          appointmentType={formData.appointmentType}
          date={formData.date}
          time={formData.time}
          paymentStatus={formData.paymentStatus}
          onAppointmentTypeChange={(value) =>
            setFormData({ ...formData, appointmentType: value || "" })
          }
          onDateChange={(value) =>
            setFormData({ ...formData, date: value })
          }
          onTimeChange={(value) =>
            setFormData({ ...formData, time: value })
          }
          onPaymentStatusChange={(value) =>
            setFormData({ ...formData, paymentStatus: value || "" })
          }
        />

        {/* Submit Button */}
        <Button
          fullWidth
          size="lg"
          radius="md"
          className="mt-6"
          style={{ backgroundColor: colors.primary }}
          onClick={handleSubmit}
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default AddAppointment;