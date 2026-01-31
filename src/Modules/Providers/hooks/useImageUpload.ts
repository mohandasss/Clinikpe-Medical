import { useMutation } from "@tanstack/react-query";
import type { FileUploadResponse } from "../../../Apis/modules/providers/providers.types";
import type { ApiSuccess, ApiFailure } from "../../../Apis/client/ApiAgents.types";
import { ImageUpload } from "../../../Apis/modules/providers/providers.api";
import { showToast } from "../../../app/provider/toaster.config";

interface UseImageUploadOptions {
    onSuccess?: (data: FileUploadResponse) => void;
    onError?: (error: string) => void;
}

export function useImageUpload(options?: UseImageUploadOptions) {
    const mutation = useMutation<
        ApiSuccess<FileUploadResponse>,
        ApiFailure,
        { payload: FormData; purpose?: string }
    >({
        mutationFn: ({ payload, purpose }) => {
            return ImageUpload(payload, purpose);
        },
        onSuccess: (response: ApiSuccess<FileUploadResponse>) => {
            console.log("Image Upload Success:", response);
            showToast.success("Image uploaded successfully!");
            options?.onSuccess?.(response.data);
        },
        onError: (apiError: ApiFailure) => {
            console.error("Image Upload Error:", apiError);
            const errorMessage = apiError?.message || "Failed to upload image. Please try again.";
            showToast.error(errorMessage);
            options?.onError?.(errorMessage);
        },
        retry: 1,
    });

    return {
        mutate: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error?.message || null,
        data: mutation.data?.data || null,
    };
}
