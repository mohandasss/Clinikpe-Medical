import { apiRequest } from "../../../client/ApiAgents";
import { type VerifyOtpPayload, type VerifyOtpData } from "./VerifyOtp.types";

export function VerifyOtp(payload: VerifyOtpPayload) {
    return apiRequest<VerifyOtpData>({
        url: "organizations/medical-store/verify-otp",
        method: "post",
        data: payload,
    });
}
