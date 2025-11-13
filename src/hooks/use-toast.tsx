"use client";

import { toast as sonnerToast } from "sonner";
import { CheckCircle, AlertCircle, AlertTriangle, Info, Copy } from "lucide-react";

type ToastProps = {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
};

export const toast = {
  success: ({ title, description, action, duration = 4000 }: ToastProps) => {
    return sonnerToast.success(title || "Success", {
      description,
      action,
      duration,
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    });
  },

  error: ({ title, description, action, duration = 5000 }: ToastProps) => {
    return sonnerToast.error(title || "Error", {
      description,
      action,
      duration,
      icon: <AlertCircle className="h-4 w-4 text-red-600" />,
    });
  },

  warning: ({ title, description, action, duration = 4000 }: ToastProps) => {
    return sonnerToast.warning(title || "Warning", {
      description,
      action,
      duration,
      icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
    });
  },

  info: ({ title, description, action, duration = 4000 }: ToastProps) => {
    return sonnerToast.info(title || "Info", {
      description,
      action,
      duration,
      icon: <Info className="h-4 w-4 text-blue-600" />,
    });
  },

  // Custom toast with copy functionality
  copy: (text: string, label = "Copied to clipboard!") => {
    navigator.clipboard.writeText(text).then(() => {
      sonnerToast.success(label, {
        duration: 2000,
        icon: <Copy className="h-4 w-4 text-green-600" />,
      });
    }).catch(() => {
      sonnerToast.error("Failed to copy to clipboard", {
        duration: 3000,
        icon: <AlertCircle className="h-4 w-4 text-red-600" />,
      });
    });
  },

  // Loading toast
  loading: (message = "Loading...") => {
    return sonnerToast.loading(message);
  },

  // Dismiss toast
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },

  // Promise toast
  promise: function <T>(
    promise: Promise<T>,
    {
      loading = "Loading...",
      success = "Success!",
      error = "Something went wrong",
    }: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((error: unknown) => string);
    } = {}
  ) {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error,
    });
  },
};