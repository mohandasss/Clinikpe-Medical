import { Button, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../assets/Logo.svg";
import { colors } from "../../Constants/colors";
import { phoneSchema, type PhoneFormValues } from "./schemas";
import { useRequestOtp } from "./hooks/useRequestOtp";
import { useDeviceId } from "../../GlobalHooks/useDeviceId";
import { useDeviceType } from "../../GlobalHooks/useDeviceType";

export default function LoginPage() {
  const deviceId = useDeviceId();
  const deviceType = useDeviceType();
  const { mutate: requestOtp, isLoading } = useRequestOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: PhoneFormValues) => {
    // Construct payload
    const payload = {
      emailMobile: "91" + data.phoneNumber,
      device_type: deviceType || "mobile",
      device_id: deviceId || "unknown",
      frontend_type: "app",
    };

    // Call API through hook (toast will be handled in hook)
    requestOtp(payload);
  };

  return (
    <div
      className="min-h-full px-2 flex flex-col justify-center items-center"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      {/* Logo Section */}
      <div className="mb-8 ">
        <div className="flex flex-col items-center ">
          <img src={logo} alt="ClinicPe" className="h-20 mb-1" />
        </div>

        {/* Medical Store Access */}
        <h2
          className="text-2xl font-bold text-center mb-12"
          style={{ color: colors.black }}
        >
          Medical Store Access
        </h2>
      </div>

      {/* Card */}
      <div className="rounded-lg p-0 w-full max-w-mobile mx-auto">
        {/* Heading */}
        <h1
          className="text-md font-semibold mb-2 text-center"
          style={{ color: colors.black }}
        >
          Login With Mobile Number
        </h1>

        {/* Description */}
        <p
          className="text-sm mb-6 text-center"
          style={{ color: colors.secondary }}
        >
          We'll send an OTP verify your number
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Phone Number Input */}
          <div className="flex gap-0 w-full">
            <div
              className="flex items-center px-3 rounded-l-md border"
              style={{
                borderColor: "#E5E7EB",
              }}
            >
              <span className="font-medium" style={{ color: colors.black }}>
                +91
              </span>
            </div>
            <TextInput
              size="lg"
              placeholder="Enter phone number"
              className="flex-1 w-full"
              classNames={{
                input: "rounded-none rounded-r-md w-full",
              }}
              error={errors.phoneNumber?.message}
              {...register("phoneNumber")}
              styles={{
                input: {
                  borderColor: "#E5E7EB",
                  borderLeft: "none",
                },
              }}
              disabled={isLoading || !deviceId}
            />
          </div>

          {/* Send OTP Button */}
          <Button
            type="submit"
            fullWidth
            radius="md"
            className="font-semibold"
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              padding: "12px",
            }}
            loading={isLoading}
            disabled={isLoading || !deviceId}
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>

        {/* Footer Text */}
        <p
          className="text-xs text-center mt-4"
          style={{ color: colors.secondary }}
        >
          No passwords. Secure OTP based login.
        </p>

        {/* Device Info Debug (Dev only) */}
        
      </div>
    </div>
  );
}
