import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Camera } from "lucide-react";
import { TextInput, Stack, Loader, Select } from "@mantine/core";
import { useImageUpload } from "../hooks/useImageUpload";
import { useSpecialities } from "../hooks/useSpecialities";
import { useGetExperience } from "../hooks/useGetExperience";
import { useGetDegree } from "../hooks/useGetDegree";
import type { ProviderFormType } from "../schemas/provider.schema";
import type { SpecialityResponse } from "../../../Apis/modules/master/speciality.types";

interface ProviderFormProps {
  isSubmitting?: boolean;
}

export default function ProviderForm({
  isSubmitting = false,
}: ProviderFormProps) {
  const { control } = useFormContext<ProviderFormType>();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const { mutate: uploadImage, isLoading: isUploadingImage } = useImageUpload({
    onSuccess: (data) => {
      setProfileImageUrl(data.fileUrl);
    },
  });

  const {
    data: specialities,
    isLoading: isLoadingSpecialities,
    error: specialityError,
  } = useSpecialities();

  // Fetch experience data
  const {
    data: experienceData,
    isLoading: isLoadingExperience,
    error: experienceError,
  } = useGetExperience();

  // Fetch degree data
  const {
    data: degreeData,
    isLoading: isLoadingDegree,
    error: degreeError,
  } = useGetDegree();

  // Prepare select options
  const specializations = specialities.map((item: SpecialityResponse) => ({
    value: item.uid,
    label: item.name,
  }));

  // Prepare experience options
  const experiences =
    experienceData?.map((item) => ({
      value: item.name,
      label: item.name,
    })) || [];

  // Prepare degree options
  const degrees =
    degreeData?.map((item) => ({
      value: item.name,
      label: item.name,
    })) || [];

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setProfileImage(file);

      // Upload image
      const formData = new FormData();
      formData.append("file", file);
      uploadImage({ payload: formData, purpose: "provider-profile" });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-gray-200 transition">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              {isUploadingImage ? (
                <Loader size={24} className="text-blue-500 animate-spin" />
              ) : (
                <Camera size={24} className="text-gray-400" />
              )}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isUploadingImage || isSubmitting}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-xs text-gray-500">Optional</p>
        {isUploadingImage && (
          <p className="text-xs text-blue-500">Uploading...</p>
        )}
      </div>

      {/* Form Fields */}
      <Stack gap="sm">
        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              label="Full Name"
              placeholder="e.g. Dr. John Doe"
              {...field}
              radius="md"
              size="lg"
              error={error?.message}
              disabled={isSubmitting}
              classNames={{
                label: "text-sm font-medium text-gray-900 mb-1",
              }}
            />
          )}
        />

        <Controller
          name="specialization"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              label="Specialization"
              placeholder="Select specialization"
              data={specializations}
              {...field}
              radius="md"
              size="lg"
              error={error?.message}
              disabled={isLoadingSpecialities}
              classNames={{
                label: "text-sm font-medium text-gray-900 mb-1",
              }}
            />
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <Controller
            name="experience"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Select
                label="Experience"
                placeholder={
                  isLoadingExperience ? "Loading..." : "Select experience"
                }
                data={experiences}
                {...field}
                radius="md"
                size="lg"
                error={
                  error?.message ||
                  (experienceError ? "Failed to load experiences" : undefined)
                }
                disabled={isLoadingExperience || isSubmitting}
                classNames={{
                  label: "text-sm font-medium text-gray-900 mb-1",
                }}
              />
            )}
          />
          <Controller
            name="degree"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Select
                label="Degree"
                placeholder={isLoadingDegree ? "Loading..." : "Select degree"}
                data={degrees}
                {...field}
                radius="md"
                size="lg"
                error={
                  error?.message ||
                  (degreeError ? "Failed to load degrees" : undefined)
                }
                disabled={isLoadingDegree || isSubmitting}
                classNames={{
                  label: "text-sm font-medium text-gray-900 mb-1",
                }}
              />
            )}
          />
        </div>

        <Controller
          name="consultationFee"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              label="Consultation Fee"
              placeholder="500"
              leftSection="₹"
              {...field}
              radius="md"
              size="lg"
              error={error?.message}
              disabled={isSubmitting}
              classNames={{
                label: "text-sm font-medium text-gray-900 mb-1",
              }}
            />
          )}
        />
      </Stack>
    </div>
  );
}

export { type ProviderFormType };
