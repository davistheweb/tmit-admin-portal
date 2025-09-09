interface SuccessResponse {
  message: string;
}

interface ErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}
export type { SuccessResponse, ErrorResponse };
