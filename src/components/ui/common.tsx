import React from "react";
import { cn } from "../../lib/utils";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "./Button";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function LoadingSpinner({
  size = "md",
  className = "",
  text = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center space-y-3">
        <Loader2
          className={cn("animate-spin text-primary", sizeClasses[size])}
        />
        {text && (
          <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
        )}
      </div>
    </div>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
  variant?: "destructive" | "warning" | "info";
}

export function ErrorMessage({
  message,
  onRetry,
  className = "",
  variant = "destructive",
}: ErrorMessageProps) {
  const variantStyles = {
    destructive: {
      container: "bg-destructive/10 border-destructive/20 text-destructive",
      icon: XCircle,
      iconColor: "text-destructive",
    },
    warning: {
      container:
        "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200",
      icon: AlertTriangle,
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    info: {
      container:
        "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
      icon: AlertCircle,
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  };

  const style = variantStyles[variant];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "rounded-lg border p-4 animate-fade-in",
        style.container,
        className
      )}
    >
      <div className="flex items-start space-x-3">
        <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", style.iconColor)} />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium mb-1">
            {variant === "destructive"
              ? "Error"
              : variant === "warning"
              ? "Warning"
              : "Information"}
          </h4>
          <p className="text-sm">{message}</p>
          {onRetry && (
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="h-8 px-3"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SuccessMessageProps {
  message: string;
  className?: string;
  onDismiss?: () => void;
}

export function SuccessMessage({
  message,
  className = "",
  onDismiss,
}: SuccessMessageProps) {
  return (
    <div
      className={cn(
        "bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 animate-fade-in dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
        className
      )}
    >
      <div className="flex items-start space-x-3">
        <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-600 dark:text-green-400 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium mb-1">Success</h4>
          <p className="text-sm">{message}</p>
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
          >
            <XCircle className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-12 animate-fade-in",
        className
      )}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} className="hover-lift">
          {action.label}
        </Button>
      )}
    </div>
  );
}

interface StatusIndicatorProps {
  status: "online" | "offline" | "pending" | "error";
  label?: string;
  size?: "sm" | "md";
}

export function StatusIndicator({
  status,
  label,
  size = "sm",
}: StatusIndicatorProps) {
  const statusStyles = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    pending: "bg-yellow-500",
    error: "bg-red-500",
  };

  const sizeStyles = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div
          className={cn("rounded-full", statusStyles[status], sizeStyles[size])}
        />
        {status === "online" && (
          <div
            className={cn(
              "absolute inset-0 rounded-full animate-ping",
              statusStyles[status],
              sizeStyles[size]
            )}
          />
        )}
      </div>
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
}
