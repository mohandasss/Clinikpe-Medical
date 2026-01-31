export class ApiError extends Error {
    public httpStatus?: number;
    public errors?: unknown;
    public isAuthError?: boolean;
    public isNetworkError?: boolean;

    constructor(
        message: string,
        httpStatus?: number,
        errors?: unknown,
        isAuthError?: boolean,
        isNetworkError?: boolean
    ) {
        super(message);
        this.name = "ApiError";

        this.httpStatus = httpStatus;
        this.errors = errors;
        this.isAuthError = isAuthError;
        this.isNetworkError = isNetworkError;
    }
}
