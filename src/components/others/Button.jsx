import { ShoppingCart, Zap, Loader2 } from 'lucide-react';
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  icon,
  type = "button",
  label = "Button",
  variant = "default",
  onClick,
  className = "",
  disabled = false,
  size = "md",
  fullWidth = false,
  // Add to Cart specific
  quantity,
  isInCart,
  // Buy Now specific
  isLoading,
  isAvailable,
  // New props
  rounded = "md",
  iconPosition = "left",
  loadingText = "Processing...",
  tooltip,
  ariaLabel,
}) => {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  // Size variants
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  // Rounded variants
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  };
  
  // Color variants
  const variantStyles = {
    default: "bg-gray-800 text-white hover:bg-gray-700 focus-visible:ring-gray-500 active:bg-gray-600",
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 active:bg-blue-800",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 active:bg-red-800",
    success: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500 active:bg-green-800",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500 active:bg-yellow-700",
    outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500 active:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500 active:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700",
    link: "bg-transparent text-blue-600 hover:text-blue-800 hover:underline focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300",
    addToCart: `bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500 active:bg-emerald-800 ${isInCart ? '!bg-emerald-800' : ''}`,
    buyNow: `bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-500 active:bg-purple-800 ${!isAvailable ? '!bg-gray-500 !cursor-not-allowed' : ''}`
  };
  
  // Icon size
  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20
  };

  // Determine icon based on variant if not provided
  const resolvedIcon = icon || (
    variant === 'addToCart' ? <ShoppingCart size={iconSize[size]} /> :
    variant === 'buyNow' ? <Zap size={iconSize[size]} /> :
    null
  );

  // Determine label based on variant if not provided
  const resolvedLabel = label || (
    variant === 'addToCart' ? (isInCart ? 'Added to Cart' : 'Add to Cart') :
    variant === 'buyNow' ? 'Buy Now' :
    label
  );

  // Loading state content
  const loadingContent = (
    <>
      <Loader2 className={`animate-spin ${size === 'sm' ? 'mr-1.5' : 'mr-2'}`} size={iconSize[size]} />
      {loadingText}
    </>
  );

  // Regular content
  const regularContent = (
    <>
      {iconPosition === 'left' && resolvedIcon && (
        <span className={`${size === 'sm' ? 'mr-1.5' : 'mr-2'}`}>
          {React.cloneElement(resolvedIcon, { size: iconSize[size] })}
        </span>
      )}
      {resolvedLabel}
      {iconPosition === 'right' && resolvedIcon && (
        <span className={`${size === 'sm' ? 'ml-1.5' : 'ml-2'}`}>
          {React.cloneElement(resolvedIcon, { size: iconSize[size] })}
        </span>
      )}
      {quantity && variant === 'addToCart' && quantity > 0 && (
        <span className="ml-2 bg-white text-emerald-600 rounded-full px-2 py-0.5 text-xs font-bold">
          {quantity}
        </span>
      )}
    </>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || (variant === 'buyNow' && !isAvailable) || isLoading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${roundedStyles[rounded]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
        ${isLoading ? 'cursor-wait' : ''}
      `}
      title={tooltip}
      aria-label={ariaLabel || resolvedLabel}
    >
      {isLoading ? loadingContent : regularContent}
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.element,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  label: PropTypes.string,
  variant: PropTypes.oneOf([
    'default', 'primary', 'danger', 'success', 'warning', 
    'outline', 'ghost', 'link', 'addToCart', 'buyNow'
  ]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  quantity: PropTypes.number,
  isInCart: PropTypes.bool,
  isLoading: PropTypes.bool,
  isAvailable: PropTypes.bool,
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  loadingText: PropTypes.string,
  tooltip: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Button;