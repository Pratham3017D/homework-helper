export type ApiErrorCode =
  | "INVALID_INPUT"
  | "MALFORMED_JSON"
  | "PAYLOAD_TOO_LARGE"
  | "RATE_LIMIT_EXCEEDED"
  | "SERVICE_UNAVAILABLE"
  | "TRANSLATION_FAILED"
  | "INTERNAL_SERVER_ERROR";

export interface ApiErrorDetail {
  field?: string;
  issue: string;
}

export interface ApiErrorPayload {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: ApiErrorDetail[];
    retryAfter?: number;
  };
}

/**
 * Creates a standard, secure API error response using web-standard Response.
 * Compatible with Next.js App Router and standalone test runners.
 * Ensures stack traces and provider credentials are never leaked to clients.
 */
export function createApiErrorResponse(
  code: ApiErrorCode,
  message: string,
  status: number,
  options: {
    details?: ApiErrorDetail[];
    retryAfter?: number;
    headers?: Record<string, string>;
  } = {}
): Response {
  const payload: ApiErrorPayload = {
    error: {
      code,
      message,
      ...(options.details && options.details.length > 0 ? { details: options.details } : {}),
      ...(options.retryAfter !== undefined ? { retryAfter: options.retryAfter } : {}),
    },
  };

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  return Response.json(payload, {
    status,
    headers,
  });
}
