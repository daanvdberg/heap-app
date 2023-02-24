import React, { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react';
import { cls } from '../../utils';

const classes = {
  base: 'focus:outline-none transition ease-in-out duration-200 rounded',
  disabled: 'opacity-50 cursor-not-allowed',
  pill: 'rounded-full',
  size: {
    small: 'px-2 py-1 text-sm',
    normal: 'px-4 py-2',
    large: 'px-8 py-3 text-lg',
  },
  variant: {
    primary: 'bg-sky-600 hover:bg-sky-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-slate-100',
    secondary:
      'bg-slate-300 hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 text-slate-900 hover:text-slate-100',
    danger: 'bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-slate-100',
  },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'button';
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'normal' | 'large';
  pill?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (
    {
      children,
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'normal',
      pill = false,
      disabled = false,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${pill ? classes.pill : ''}
                ${disabled ? classes.disabled : ''}
                ${className}
            `)}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';
export default Button;
