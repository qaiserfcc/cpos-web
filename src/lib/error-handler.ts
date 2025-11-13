import { toast } from "@/hooks/use-toast";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
}

export interface NetworkError {
  message: string;
  isNetworkError: boolean;
}

export class AppError extends Error {
  public readonly status?: number;
  public readonly code?: string;
  public readonly details?: Record<string, unknown>;
  public readonly isNetworkError?: boolean;

  constructor(
    message: string,
    status?: number,
    code?: string,
    details?: Record<string, unknown>,
    isNetworkError = false
  ) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.isNetworkError = isNetworkError;
  }
}

// Error handling utilities
export const errorHandler = {
  // Handle API errors
  handleApiError: (error: unknown): ApiError => {
    if (error instanceof AppError) {
      return {
        message: error.message,
        status: error.status,
        code: error.code,
        details: error.details,
      };
    }

    // Handle Axios-like errors
    if (error && typeof error === "object" && "response" in error) {
      const responseError = error as { response?: { status?: number; data?: Record<string, unknown> } };
      const { status, data } = responseError.response || {};
      return {
        message: data?.message as string || `Request failed with status ${status}`,
        status,
        code: data?.code as string,
        details: data,
      };
    }

    // Handle fetch errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        message: "Network error. Please check your internet connection.",
        status: 0,
        code: "NETWORK_ERROR",
        details: { error: error.message },
      };
    }

    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return {
      message: errorMessage,
      status: error && typeof error === "object" && "status" in error ? (error as { status?: number }).status : undefined,
      code: error && typeof error === "object" && "code" in error ? (error as { code?: string }).code : undefined,
      details: error && typeof error === "object" ? error as Record<string, unknown> : undefined,
    };
  },

  // Handle and display errors with toast
  showError: (error: unknown, customMessage?: string) => {
    const apiError = errorHandler.handleApiError(error);

    let message = customMessage || apiError.message;
    let description = "";

    // Add more context based on status code
    if (apiError.status) {
      switch (apiError.status) {
        case 400:
          message = message || "Bad request. Please check your input.";
          break;
        case 401:
          message = message || "Authentication required. Please log in again.";
          break;
        case 403:
          message = message || "Access denied. You don't have permission.";
          break;
        case 404:
          message = message || "Resource not found.";
          break;
        case 422:
          message = message || "Validation failed. Please check your input.";
          break;
        case 429:
          message = message || "Too many requests. Please try again later.";
          break;
        case 500:
          message = message || "Server error. Please try again later.";
          break;
        case 503:
          message = message || "Service unavailable. Please try again later.";
          break;
        default:
          if (apiError.status >= 500) {
            message = message || "Server error. Please try again later.";
          }
      }
    }

    // Add details if available
    if (apiError.details && typeof apiError.details === "object") {
      const details = Object.entries(apiError.details)
        .filter(([key]) => key !== "message")
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
      if (details) {
        description = details;
      }
    }

    toast.error({
      title: message,
      description: description || undefined,
    });

    return apiError;
  },

  // Handle network errors specifically
  handleNetworkError: (): NetworkError => {
    return {
      message: "Network connection failed. Please check your internet connection and try again.",
      isNetworkError: true,
    };
  },

  // Show network error
  showNetworkError: () => {
    toast.error({
      title: "Connection Error",
      description: "Please check your internet connection and try again.",
    });
  },

  // Show success message
  showSuccess: (message: string, description?: string) => {
    toast.success({
      title: message,
      description,
    });
  },

  // Show warning message
  showWarning: (message: string, description?: string) => {
    toast.warning({
      title: message,
      description,
    });
  },

  // Show info message
  showInfo: (message: string, description?: string) => {
    toast.info({
      title: message,
      description,
    });
  },

  // Generic error boundary handler
  handleBoundaryError: (error: Error, errorInfo: { componentStack?: string }) => {
    console.error("Error Boundary caught an error:", error, errorInfo);

    toast.error({
      title: "Something went wrong",
      description: "An unexpected error occurred. Please refresh the page.",
    });
  },
};

// API request wrapper with error handling
export const apiRequest = async <T>(
  request: () => Promise<T>,
  options: {
    showErrorToast?: boolean;
    customErrorMessage?: string;
    showSuccessToast?: boolean;
    successMessage?: string;
  } = {}
): Promise<T | null> => {
  const {
    showErrorToast = true,
    customErrorMessage,
    showSuccessToast = false,
    successMessage,
  } = options;

  try {
    const result = await request();

    if (showSuccessToast && successMessage) {
      errorHandler.showSuccess(successMessage);
    }

    return result;
  } catch (error) {
    if (showErrorToast) {
      errorHandler.showError(error, customErrorMessage);
    }
    return null;
  }
};

// Form validation error handler
export const handleFormError = (error: unknown) => {
  if (error && typeof error === "object" && "details" in error && Array.isArray((error as { details?: unknown[] }).details)) {
    // Handle validation errors
    const validationErrors: Record<string, string> = {};
    (error as { details: unknown[] }).details.forEach((detail: unknown) => {
      if (detail && typeof detail === "object" && "field" in detail && "message" in detail) {
        const fieldDetail = detail as { field: string; message: string };
        validationErrors[fieldDetail.field] = fieldDetail.message;
      }
    });
    return validationErrors;
  }

  // Handle single field errors
  if (error && typeof error === "object" && "field" in error && "message" in error) {
    const fieldError = error as { field: string; message: string };
    return { [fieldError.field]: fieldError.message };
  }

  // Fallback to general error
  errorHandler.showError(error);
  return {};
};