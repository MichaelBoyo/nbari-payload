import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface OnboardingLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  category: string
  onBack?: () => void
  onNext?: () => void
  nextText?: string
  showLogo?: boolean
}

export default function OnboardingLayout({
  children,
  title,
  subtitle,
  category,
  onBack,
  onNext,
  nextText = 'CONTINUE',
  showLogo = true,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px] min-h-[680px] shadow-md relative rounded-2xl flex flex-col">
        <CardContent className="p-12 pb-[65px] space-y-8 flex-grow">
          {showLogo && (
            <div className="flex justify-center">
              <Image
                src="/nbari-logo.svg"
                alt="Nbari Logo"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          )}

          <div className="space-y-1 text-left">
            <p className="text-xs text-green-600 tracking-widest uppercase mb-2">{category}</p>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>

          {children}
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 flex h-[65px] bg-[#F5F5F5] rounded-b-2xl border-t border-gray-200">
          {onBack ? (
            <>
              <Button
                onClick={onBack}
                variant="ghost"
                className="flex-1 rounded-none rounded-bl-2xl justify-start px-4"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                BACK
              </Button>
              <Button
                onClick={onNext}
                variant="ghost"
                className="flex-1 rounded-none rounded-br-2xl justify-end px-4"
              >
                {nextText}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </>
          ) : (
            <Button
              onClick={onNext}
              variant="ghost"
              className="flex-1 rounded-none rounded-b-2xl px-4"
            >
              <span className="flex-grow text-left">{nextText}</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
