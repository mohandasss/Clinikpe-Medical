import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { AuthInitPayload, AuthOtpData } from "../../../Apis/modules/auth/RequestOtp/RequestOtp.types";
import type { ApiSuccess, ApiFailure } from "../../../Apis/client/ApiAgents.types";
import { RequestOtp } from "../../../Apis/modules/auth/RequestOtp/RequestOtp.api";
import { showToast } from "../../../app/provider/toaster.config";

export function useRequestOtp() {
  const navigate = useNavigate();

  const mutation = useMutation<ApiSuccess<AuthOtpData>, ApiFailure, AuthInitPayload>({
    mutationFn: (payload: AuthInitPayload) => {
      console.log("OTP Request Payload:", payload);
      return RequestOtp(payload);
    },
    onSuccess: (response: ApiSuccess<AuthOtpData>, variables: AuthInitPayload) => {
      console.log("OTP Request Success:", response);
      showToast.success("OTP sent successfully! Check your phone.");
      const { otp_id, request_id } = response?.data?.otpDetails || {};
      if (request_id && otp_id) {
        const phoneNumber = variables.emailMobile.replace(/^91/, '');
        setTimeout(() => {
          navigate("/verify-otp", {
            state: {
              otp_id,
              requestId: request_id,
              phoneNumber,
            }
          });
        }, 500);
      }
    },
    onError: (apiError: ApiFailure) => {
      console.error("OTP Request Error:", apiError);
      const errorMessage = apiError?.message || "Failed to send OTP. Please try again.";
      showToast.error(errorMessage);
    },
    retry: false,
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    data: mutation.data?.data || null,
  };
}
