import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2';
    const normalStyles =
      'border-gray-300 focus:border-brand-primary focus:ring-brand-primary';
    const errorStyles =
      'border-red-500 focus:border-red-500 focus:ring-red-500';
    const disabledStyles = 'bg-gray-100 cursor-not-allowed';

    const inputStyles = error
      ? errorStyles
      : disabled
      ? disabledStyles
      : normalStyles;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={`${baseStyles} ${inputStyles} ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${className}`}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
