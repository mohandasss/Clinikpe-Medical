import { apiRequest } from "../../../client/ApiAgents";
import { type AuthInitPayload, type AuthOtpData } from "./RequestOtp.types";



export function RequestOtp(payload: AuthInitPayload) {
    return apiRequest<AuthOtpData>({
        url: "organizations/medical-store/request-otp",
        method: "post",
        data: payload,
    });
}

// export function logout() {
//     return apiRequest({
//         url: "logout",
//         method: "post",
//         data: {},
//     });
// }