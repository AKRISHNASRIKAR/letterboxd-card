'use client'

import React from 'react'

type Variant = 'primary' | 'ghost' | 'outline' | 'danger'
type Size    = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonProps {
  children:   React.ReactNode
  onClick?:   () => void
  variant?:   Variant
  size?:      Size
  disabled?:  boolean
  loading?:   boolean
  fullWidth?: boolean
  className?: string
  type?:      'button' | 'submit' | 'reset'
  title?:     string
}

const variantStyles: Record<Variant, string> = {
  primary: `
    bg-[#d4a853] text-[#160e00] font-semibold
    hover:bg-[#dfb86a] active:bg-[#c89840]
    shadow-[0_2px_16px_rgba(212,168,83,0.25)]
    hover:shadow-[0_4px_24px_rgba(212,168,83,0.38)]
    active:shadow-none
  `,
  ghost: `
    text-[var(--text2)] hover:text-[var(--text)]
    hover:bg-white/[0.05]
    active:bg-white/[0.08]
  `,
  outline: `
    border border-[var(--border2)] text-[var(--text2)]
    hover:border-[var(--border3)] hover:text-[var(--text)]
    hover:bg-white/[0.04]
    active:bg-white/[0.07]
  `,
  danger: `
    border border-[rgba(224,92,92,0.3)] text-[#e05c5c]
    hover:border-[rgba(224,92,92,0.5)] hover:bg-[rgba(224,92,92,0.08)]
    active:bg-[rgba(224,92,92,0.12)]
  `,
}

const sizeStyles: Record<Size, string> = {
  xs: 'px-2.5 py-1   text-xs  rounded-lg  gap-1',
  sm: 'px-3.5 py-1.5 text-xs  rounded-xl  gap-1.5',
  md: 'px-5   py-2.5 text-sm  rounded-xl  gap-2',
  lg: 'px-6   py-3   text-sm  rounded-2xl gap-2',
}

export function Button({
  children,
  onClick,
  variant   = 'primary',
  size      = 'md',
  disabled  = false,
  loading   = false,
  fullWidth = false,
  className = '',
  type      = 'button',
  title,
}: ButtonProps) {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center
        font-medium leading-none
        transition-all duration-150 cursor-pointer select-none
        disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
        active:scale-[0.97]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{ fontFamily: 'var(--sans)' }}
    >
      {loading && (
        <svg
          className="animate-spin"
          width="14" height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      )}
      {children}
    </button>
  )
}
