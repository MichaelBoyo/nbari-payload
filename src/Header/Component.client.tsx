'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BookOpen, Cog, Home } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])
  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/courses', label: 'Courses', icon: BookOpen },

    { href: '/settings', label: 'Settings', icon: Cog },
  ]

  return (
    <header className="md:container md:max-w-2xl w-full  z-20 shadow-2xl rounded-2xl">
      <div className=" flex justify-between w-full">
        {links.slice(0, 2).map((link, idx) => (
          <Link key={idx} className="flex flex-col items-center  " href={link.href}>
            <div className="p-3 flex flex-col items-center ">
              <link.icon className="h-5 w-5" />
              <p className="text-[12px]">{link.label}</p>
            </div>

            {pathname === link.href && <Separator className="h-[2px] bg-gray-300" />}
          </Link>
        ))}
        <div className="p-3 flex flex-col items-center ">
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>
        </div>
        {links.slice(2).map((link, idx) => (
          <Link key={idx} className="flex flex-col items-center  " href={link.href}>
            <div className="p-3 flex flex-col items-center ">
              <link.icon className="h-5 w-5" />
              <p className="text-[12px]">{link.label}</p>
            </div>

            {pathname === link.href && <Separator className="h-[2px] bg-gray-300" />}
          </Link>
        ))}
        <div className="p-3 ">
          <Link className="flex flex-col items-center " href={'/'}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>DI</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}
