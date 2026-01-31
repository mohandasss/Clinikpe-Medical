export interface AuthInitPayload {
  emailMobile: string;
  device_type: string
  device_id: string;
  frontend_type: string
}

export interface AuthOtpData {
  otpDetails: {
    otp_id: string;
    request_id: string;
  };
}
