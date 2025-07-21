import React from "react";
import { cn } from "../../utils/classMerge"; // Utility function for class merging

const Input = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      error = false,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    // Base input classes
    const baseClasses =
      "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    // Variant classes
    const variantClasses = {
      default: "border-input",
      filled: "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600",
      ghost: "border-transparent hover:border-gray-300 dark:hover:border-gray-600",
    };

    // Size classes
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
    };

    // Error classes
    const errorClasses = error
      ? "border-red-500 dark:border-red-400 focus-visible:ring-red-300 dark:focus-visible:ring-red-700"
      : "";

    // Icon padding classes
    const iconPaddingClasses = icon
      ? iconPosition === "left"
        ? "pl-10"
        : "pr-10"
      : "";

    return (
      <div className="relative w-full">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            errorClasses,
            iconPaddingClasses,
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;