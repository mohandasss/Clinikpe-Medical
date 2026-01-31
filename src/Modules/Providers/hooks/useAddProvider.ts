import { useMutation } from "@tanstack/react-query";
import { addProvider, setProviderAvailability, inviteProvider } from "../../../Apis/modules/providers/AddProvider.api";
import type {
    AddProviderPayload,
    AddProviderResponse,
    SetAvailabilityPayload,
    SetAvailabilityResponse,
} from "../../../Apis/modules/providers/AddProvider.api";

interface UseAddProviderOptions {
    onSuccess?: (data: AddProviderResponse) => void;
    onError?: (error: Error) => void;
}

export function useAddProvider(options?: UseAddProviderOptions) {
    return useMutation({
        mutationFn: (payload: AddProviderPayload) => addProvider(payload),
        onSuccess: options?.onSuccess,
        onError: options?.onError,
    });
}

interface UseSetAvailabilityOptions {
    onSuccess?: (data: SetAvailabilityResponse) => void;
    onError?: (error: Error) => void;
}

export function useSetAvailability(options?: UseSetAvailabilityOptions) {
    return useMutation({
        mutationFn: (payload: SetAvailabilityPayload) => setProviderAvailability(payload),
        onSuccess: options?.onSuccess,
        onError: options?.onError,
    });
}

interface UseInviteProviderOptions {
    onSuccess?: (data: { invitationId: string; email: string }) => void;
    onError?: (error: Error) => void;
}

export function useInviteProvider(options?: UseInviteProviderOptions) {
    return useMutation({
        mutationFn: (email: string) => inviteProvider(email),
        onSuccess: options?.onSuccess,
        onError: options?.onError,
    });
}
