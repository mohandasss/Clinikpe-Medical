import React, { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import logo from "../../assets/Logo.svg";
import { colors } from "../../Constants/colors";

const basicDetailsSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  ownerName: z.string().min(1, "Owner / Manager name is required"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

type BasicDetailsFormValues = z.infer<typeof basicDetailsSchema>;

export default function BasicDetails() {
  const [address, setAddress] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BasicDetailsFormValues>({
    resolver: zodResolver(basicDetailsSchema),
    mode: "onSubmit",
  });

  const phoneNumber = watch("phoneNumber");

  const onSubmit = async (data: BasicDetailsFormValues) => {
    console.log("Basic Details:", { ...data, address });
    // TODO: Call store registration API
  };

  // Exposed submit function so the button (rendered outside the form) can trigger validation/submit
  const submitForm = handleSubmit(onSubmit);

  const handleAddAddress = () => {
    // TODO: Open address modal/page
    console.log("Add Address");
  };

  return (
    <div
      className="min-h-screen px-2 flex flex-col"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <header className="py-2 w-full">
        {/* Top Icon / Logo */}
        <div className="flex flex-col items-center mb-1">
          <img src={logo} alt="ClinicPe" className="h-20 mb-1" />
        </div>

        {/* Info Banner */}
        <div
          className="w-full max-w-mobile mx-auto rounded-lg p-2 mb-1"
          style={{ backgroundColor: "#D0E5FF" }}
        >
          <p
            className="text-sm text-[#0D52AF] font-semibold text-center"
            style={{ color: "#0D52AF" }}
          >
            Help Patient Book Doctor Appointment Easily
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center w-full overflow-auto">
        {/* Card */}
        <div
          className="rounded-lg p-0 w-full max-w-mobile mx-auto flex flex-col"
         
        >
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="space-y-3">
              {/* Store Name */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: colors.black }}
                >
                  Store Name
                  <span style={{ color: colors.error }}>*</span>
                </label>
                <TextInput
                  placeholder="Enter your store name"
                  size="md"
                  error={errors.storeName?.message}
                  {...register("storeName")}
                  styles={{
                    input: {
                      borderColor: errors.storeName ? colors.error : "#E5E7EB",
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              {/* Owner / Manager Name */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: colors.black }}
                >
                  Owner / Manager Name
                  <span style={{ color: colors.error }}>*</span>
                </label>
                <TextInput
                  placeholder="Enter owner / manager name"
                  size="md"
                  error={errors.ownerName?.message}
                  {...register("ownerName")}
                  styles={{
                    input: {
                      borderColor: errors.ownerName ? colors.error : "#E5E7EB",
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: colors.black }}
                >
                  Phone Number
                </label>
                <div className="relative">
                  <TextInput
                    placeholder="Enter phone number"
                    size="md"
                    disabled
                    value={phoneNumber || ""}
                    error={errors.phoneNumber?.message}
                    styles={{
                      input: {
                        borderColor: "#E5E7EB",
                        borderRadius: "8px",
                        backgroundColor: "#F9FAFB",
                      },
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => console.log("Edit phone")}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke={colors.secondary}
                      strokeWidth="2"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V17h4.828l10-10a2 2 0 000-2.828z" />
                      <polyline points="7 13 13 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add Address */}
              <div>
                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="w-full py-3 rounded-lg border-2 font-semibold text-center"
                  style={{
                    borderStyle: "dashed",
                    borderColor: colors.primary,
                    color: colors.primary,
                  }}
                >
                  + Add Address
                </button>
                {address && (
                  <p className="text-xs mt-2" style={{ color: colors.secondary }}>
                    {address}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom Action Section (button sits lower) */}
      <div className="w-full px-2 pb-4 mt-2">
        <div className="max-w-mobile mx-auto">
          <Button
            type="button"
            fullWidth
            radius="md"
            className="font-semibold"
            onClick={submitForm}
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              padding: "12px",
              boxShadow: "0 6px 18px rgba(13,82,175,0.25)",
            }}
          >
            Get Store Access
          </Button>

          {/* Footer Text */}
          <p
            className="text-xs text-center mt-4 mb-6"
            style={{ color: colors.secondary }}
          >
            No prescription or patient medical details are shared with medical store.
          </p>
        </div>
      </div>
    </div>
  );
}