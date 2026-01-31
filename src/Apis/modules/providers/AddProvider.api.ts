import { apiRequest } from "../../client/ApiAgents";
import type { ProviderFormType, AvailabilityType } from "../../../Modules/Providers/schemas/provider.schema";

export interface AddProviderPayload extends Omit<ProviderFormType, 'consultationFee'> {
    profileImageUrl?: string;
    consultationFee: string;
}

export interface AddProviderResponse {
    providerId: string;
    fullName: string;
    specialization: string;
    experience: string;
    degree: string;
    consultationFee: number;
    profileImageUrl?: string;
    createdAt: string;
}

export interface SetAvailabilityPayload {
    providerId: string;
    availabilitySlots: AvailabilityType[];
}

export interface SetAvailabilityResponse {
    providerId: string;
    availabilitySlots: AvailabilityType[];
    updatedAt: string;
}

export function addProvider(payload: AddProviderPayload) {
    return apiRequest<AddProviderResponse>({
        url: "providers",
        method: "post",
        data: payload,
    });
}

export function setProviderAvailability(payload: SetAvailabilityPayload) {
    return apiRequest<SetAvailabilityResponse>({
        url: `providers/${payload.providerId}/availability`,
        method: "post",
        data: {
            availabilitySlots: payload.availabilitySlots,
        },
    });
}

export function inviteProvider(email: string) {
    return apiRequest<{ invitationId: string; email: string }>({
        url: "providers/invite",
        method: "post",
        data: { email },
    });
}
