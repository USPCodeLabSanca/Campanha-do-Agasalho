export const ErrorCodes = {
    INVALID_CREDENTIALS: { status: 401, message: "Invalid username or password." },
    UNAUTHENTICATED: { status: 401, message: "Authentication is required to access this resource." },
    FORBIDDEN: { status: 403, message: "You do not have permission to perform this action." },
    VALIDATION_ERROR: { status: 400, message: "One or more fields are invalid." },
    RESOURCE_NOT_FOUND: { status: 404, message: "The requested resource was not found." },
    RESOURCE_ALREADY_EXISTS: { status: 409, message: "A record with this data already exists." },
    TOO_MANY_REQUESTS: { status: 429, message: "Too many requests. Please try again later." },
    INTERNAL_SERVER_ERROR: { status: 500, message: "An unexpected error occurred. Please try again later." },
} as const;

export type ErrorCode = keyof typeof ErrorCodes;

export class AppError extends Error {
    public readonly status: number;

    constructor(public readonly code: ErrorCode, options?: { cause?: unknown }) {
        super(ErrorCodes[code].message, options);
        this.status = ErrorCodes[code].status;
    }
}