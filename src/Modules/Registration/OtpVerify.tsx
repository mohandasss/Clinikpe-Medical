import { Button, PinInput } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import { colors } from "../../Constants/colors";
import { otpSchema, type OTPFormValues } from "./schemas";
import { useState, useEffect } from "react";
import { useRequestOtp } from "./hooks/useRequestOtp";
import { useVerifyOtp } from "./hooks/useVerifyOtp";
import { useDeviceType } from "../../GlobalHooks/useDeviceType";
import { useDeviceId } from "../../GlobalHooks/useDeviceId";

interface LocationState {
  otp_id: string;
  requestId: string;
  phoneNumber: string;
}

export default function OtpVerifyPage() {
  const location = useLocation();
  const { otp_id, requestId, phoneNumber } =
    (location.state as LocationState) || {
      phoneNumber: "",
      otp_id: "",
      requestId: "",
    };
  const deviceType = useDeviceType();
  const deviceId = useDeviceId();
  const [timeLeft, setTimeLeft] = useState(26);
  const { mutate: requestOtp } = useRequestOtp();
  const { mutate: verifyOtp, isLoading: isVerifying } = useVerifyOtp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
  });

  const canResend = timeLeft === 0;

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const onSubmit = async (data: OTPFormValues) => {
    verifyOtp({
      emailMobile: "91" + phoneNumber,
      request_id: requestId,
      otp_id: otp_id,
      otp: data.otp,
      device_type: deviceType || "web",
      device_id: deviceId || "",
      frontend_type: "app",
    });
  };

  const handleResend = () => {
    setTimeLeft(26);

    // Call the login API again to resend OTP

    requestOtp({
      emailMobile: "91" + phoneNumber,
      device_type: deviceType,
      device_id: deviceId || "",
      frontend_type: "app",
    });
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
            +91{phoneNumber}
          </span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Input */}
          <div className="flex  justify-center">
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
                  placeholder=""
                  gap={4}
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
            loading={isVerifying}
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify & Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
