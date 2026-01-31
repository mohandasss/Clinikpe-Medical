export interface FileUploadResponse {
    fileId: string;
    fileName: string;
    fileUrl: string;
    purpose?: string;
    uploadedAt: string;
}