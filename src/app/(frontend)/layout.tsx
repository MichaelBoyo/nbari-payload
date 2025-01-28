import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'

import { Inter } from 'next/font/google'
import React from 'react'

import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { getServerSideURL } from '@/utilities/getURL'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],

  variable: '--inter-font',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(inter.className)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="space-y-3">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
