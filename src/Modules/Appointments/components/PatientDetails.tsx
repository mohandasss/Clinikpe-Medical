import React from "react";
import { TextInput, SegmentedControl } from "@mantine/core";
import { colors } from "../../../Constants/colors";

interface PatientDetailsProps {
  patientName: string;
  age: string;
  gender: "male" | "female" | "other";
  onPatientNameChange: (value: string) => void;
  onAgeChange: (value: number | undefined) => void;
  onGenderChange: (value: "male" | "female" | "other") => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({
  patientName,
  age,
  gender,
  onPatientNameChange,
  onAgeChange,
  onGenderChange,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <h3 className="text-base font-semibold text-gray-900">Patient Details</h3>

      {/* Patient Name */}
      <div>
        <TextInput
          label={<span className="text-sm font-medium text-gray-900">Patient Name</span>}
          placeholder="Enter full name"
          value={patientName}
          onChange={(e) => onPatientNameChange(e.currentTarget.value)}
          radius="md"
          size="lg"
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

      {/* Age and Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <TextInput
            label={<span className="text-sm font-medium text-gray-900">Age</span>}
            placeholder="e.g, 23"
            value={age}
            onChange={(e) => {
              const val = e.currentTarget.value;
              onAgeChange(val ? parseInt(val) : undefined);
            }}
            radius="md"
            size="lg"
            type="number"
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

        <div>
          <label className="text-sm font-medium text-gray-900 block mt-6">Gender</label>
          <SegmentedControl
            value={gender}
            onChange={(value) => onGenderChange(value as "male" | "female" | "other")}
            data={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
            fullWidth
            size="md"
            radius="md"
            styles={{
              root: {
                backgroundColor: "#f9fafb",
                padding: "4px",
              },
              indicator: {
                backgroundColor: colors.primary,
                color: "white",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
