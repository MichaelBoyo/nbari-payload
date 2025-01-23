import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (_: Props) => {
  return (
    <Image
      src="/logo.svg"
      alt="Moonlight Logo"
      width={100}
      height={40}
      className={clsx('h-10 w-auto')}
    />
  )
}
