export interface VerifyOtpPayload {
    emailMobile: string;
    request_id: string;
    otp_id: string;
    otp: string;
    device_type: string;
    device_id: string;
    frontend_type: string;
}

export interface VerifyOtpData {
    is_register: boolean;
    verified: boolean;
}
