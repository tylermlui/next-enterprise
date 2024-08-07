import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const button = cva(
  [
    'justify-center',
    'inline-flex',
    'items-center',
    'rounded-xl',
    'text-center',
    'border',
    'border-blue-400',
    'transition-colors',
    'delay-50',
  ],
  {
    variants: {
      intent: {
        primary: ['bg-blue-400', 'text-white', 'hover:enabled:bg-blue-700'],
        secondary: [
          'bg-transparent',
          'text-blue-400',
          'hover:enabled:bg-blue-400',
          'hover:enabled:text-white',
        ],
      },
      size: {
        sm: ['min-w-20', 'h-full', 'min-h-10', 'text-sm', 'py-1.5', 'px-4'],
        lg: ['min-w-32', 'h-full', 'min-h-12', 'text-lg', 'py-2.5', 'px-6'],
      },
      underline: { true: ['underline'], false: [] },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'lg',
    },
  }
);

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: 'primary' | 'secondary';
  size?: 'sm' | 'lg';
  underline?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  intent?: 'primary' | 'secondary';
  size?: 'sm' | 'lg';
  underline?: boolean;
  href: string;
}

type ButtonProps = (BaseButtonProps & { href?: never }) | (LinkButtonProps & { type?: never });

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  underline,
  href,
  type = 'button', // Default value should be valid
  children,
  ...props
}) => {
  const buttonClass = twMerge(button({ intent, size, className, underline }));

  if (href) {
    return (
      <Link href={href} legacyBehavior>
        <a className={buttonClass} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button type={type as 'button' | 'submit' | 'reset'} className={buttonClass} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
};
