import { Button, TextInput, PinInput } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../assets/Logo.svg";
import { colors } from "../../Constants/colors";
import { otpSchema, type OTPFormValues } from "./schemas";
import { useState, useEffect } from "react";

export default function OtpVerifyPage() {
  const [timeLeft, setTimeLeft] = useState(26);
  const [canResend, setCanResend] = useState(false);
  const phoneNumber = "+91-xxxxxxx1234"; // Mock - should come from previous step

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const onSubmit = async (data: OTPFormValues) => {
    console.log("OTP:", data.otp);
    // TODO: Call verifyOTP function
  };

  const handleResend = () => {
    setTimeLeft(26);
    setCanResend(false);
    // TODO: Call resendOTP function
  };

  return (
    <div
      className="min-h-full px-2 flex flex-col justify-center items-center"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      {/* Logo Section */}
      <div className="flex flex-col items-center  mb-28">
        <img src={logo} alt="ClinicPe" className="h-20 mb-1" />
      </div>

      {/* Tagline */}
    

      {/* Card */}
      <div className="rounded-lg p-0 w-full max-w-mobile mx-auto">
        {/* Heading */}
        <h1
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: colors.black }}
        >
          Verify Your Mobile Number
        </h1>

        {/* Description */}
        <p
          className="text-sm mb-6 text-center"
          style={{ color: colors.secondary }}
        >
          We have sent a 6-digit OTP to <br />
          <span style={{ color: colors.black, fontWeight: "600" }}>
            {phoneNumber}
          </span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Input */}
          <div className="flex justify-center">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <PinInput
                  {...field}
                  length={6}
                  type="number"
                  size="lg"
                  radius="md"
                  placeholder="0"
                  gap="md"
                  error={!!errors.otp}
                  styles={{
                    input: {
                      borderColor: errors.otp ? colors.error : "#E5E7EB",
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "600",
                    },
                  }}
                />
              )}
            />
          </div>

          {errors.otp && (
            <p className="text-xs text-center" style={{ color: colors.error }}>
              {errors.otp.message}
            </p>
          )}

          {/* Resend OTP */}
          <div className="text-center">
            <p className="text-sm" style={{ color: colors.secondary }}>
              Didn't receive OTP?
            </p>
            <div className="text-sm font-semibold -mt-2">
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: canResend ? colors.primary : colors.secondary }}
              >
                Resend
              </button>
              {!canResend && (
                <span style={{ color: colors.secondary }} className="ml-1">
                  in {timeLeft}s
                </span>
              )}
            </div>
          </div>

          {/* Verify Button */}
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
          >
            Verify & Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
