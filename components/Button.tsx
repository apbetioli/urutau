'use client'

import { PropsWithChildren } from 'react'
import { cn } from '@/utils/cn'

type Props = {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}

export default function Button({
  children,
  disabled,
  type,
  className,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn('p-[3px] relative')}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div
        className={cn(
          'flex items-center justify-center whitespace-nowrap gap-4 px-8 py-4 rounded-lg relative group transition duration-200 text-white font-semibold',
          className,
          disabled ? 'bg-black' : 'bg-black hover:bg-transparent',
        )}
      >
        {children}
      </div>
    </button>
  )
}
