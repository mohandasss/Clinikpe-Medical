import { apiRequest } from "../../client/ApiAgents";
import type { FileUploadResponse } from "./providers.types";

export function ImageUpload(
    payload: FormData,
    purpose?: string
) {
    if (purpose) {
        payload.append("purpose", purpose);
    }

    return apiRequest<FileUploadResponse>({
        url: "file-upload",
        method: "post",
        data: payload,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
