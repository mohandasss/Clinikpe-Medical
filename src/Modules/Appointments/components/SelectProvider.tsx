import React from "react";
import { Select } from "@mantine/core";

interface SelectProviderProps {
  selectedProvider: string;
  onProviderChange: (value: string | null) => void;
}

const SelectProvider: React.FC<SelectProviderProps> = ({
  selectedProvider,
  onProviderChange,
}) => {
  const providers = [
    { value: "dr-anup-k", label: "Dr. Anup K" },
    { value: "dr-john-doe", label: "Dr. John Doe" },
    { value: "dr-sarah-smith", label: "Dr. Sarah Smith" },
    { value: "dr-michael-brown", label: "Dr. Michael Brown" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      <Select
        label={
          <span className="text-sm font-medium text-gray-900">
            Select Provider <span className="text-red-500">*</span>
          </span>
        }
        placeholder="Choose a provider"
        data={providers}
        value={selectedProvider}
        onChange={onProviderChange}
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
  );
};

export default SelectProvider;
