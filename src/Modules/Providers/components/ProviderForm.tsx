import React, { useState } from "react";
import { Camera } from "lucide-react";
import { TextInput, Select, Stack } from "@mantine/core";
import SetAvailability from "./SetAvailability";
import { colors } from "../../../Constants/colors";

interface ProviderFormData {
  fullName: string;
  specialization: string;
  experience: string;
  degree: string;
  consultationFee: string;
}

interface ProviderFormProps {
  onSubmit?: (data: ProviderFormData, image: File | null) => void;
}

export default function ProviderForm({ onSubmit }: ProviderFormProps) {
  const [formData, setFormData] = useState<ProviderFormData>({
    fullName: "",
    specialization: "",
    experience: "",
    degree: "",
    consultationFee: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const specializations = [
    { value: "cardiologist", label: "Cardiologist" },
    { value: "dermatologist", label: "Dermatologist" },
    { value: "neurologist", label: "Neurologist" },
    { value: "orthopedic", label: "Orthopedic" },
    { value: "pediatrician", label: "Pediatrician" },
    { value: "psychiatrist", label: "Psychiatrist" },
  ];

  const handleFormChange = (field: keyof ProviderFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit?.(formData, profileImage);
  };

  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-gray-200 transition">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera size={24} className="text-gray-400" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.currentTarget.files?.[0] || null)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-xs text-gray-500">Optional</p>
      </div>

      {/* Form Fields */}
      <Stack spacing="sm">
        <TextInput
          label="Full Name"
          placeholder="e.g. Dr. John Doe"
          value={formData.fullName}
          onChange={(e) => handleFormChange("fullName", e.currentTarget.value)}
          radius="md"
          size="lg"
          classNames={{
            label: "text-sm font-medium text-gray-900 mb-1",
          }}
        />

        <Select
          label="Specialization"
          placeholder="Select specialization"
          data={specializations}
          value={formData.specialization}
          onChange={(value) =>
            handleFormChange("specialization", value || "")
          }
          radius="md"
          size="lg"
          classNames={{
            label: "text-sm font-medium text-gray-900 mb-1",
          }}
        />

        <div className="grid grid-cols-2 gap-3">
          <TextInput
            label="Experience"
            placeholder="e.g. 8+ Years"
            value={formData.experience}
            onChange={(e) =>
              handleFormChange("experience", e.currentTarget.value)
            }
            radius="md"
            size="lg"
            classNames={{
              label: "text-sm font-medium text-gray-900 mb-1",
            }}
          />
          <TextInput
            label="Degree"
            placeholder="e.g. MBBS, MD"
            value={formData.degree}
            onChange={(e) => handleFormChange("degree", e.currentTarget.value)}
            radius="md"
            size="lg"
            classNames={{
              label: "text-sm font-medium text-gray-900 mb-1",
            }}
          />
        </div>

        <TextInput
          label="Consultation Fee"
          placeholder="500"
          leftSection="₹"
          value={formData.consultationFee}
          onChange={(e) =>
            handleFormChange("consultationFee", e.currentTarget.value)
          }
          radius="md"
          size="lg"
          classNames={{
            label: "text-sm font-medium text-gray-900 mb-1",
          }}
        />
      </Stack>

      {/* Submit Button */}
      {/* <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-lg text-white font-medium text-sm transition hover:opacity-90"
        style={{ backgroundColor: colors.primary }}
      >
        Add Provider
      </button> */}

      {/* Set Availability Component */}
      
    </div>
  );
}
