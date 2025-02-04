import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-[500px] bg-white  shadow-md relative rounded-2xl flex flex-col">
        <CardContent className="p-12 pb-[65px] space-y-8 flex-grow">
          {showLogo && (
            <div className="flex justify-center">
              <Image
                src="/logo.svg"
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

        <div className="  flex  text-gray-500 bg-[#F5F5F5] rounded-b-2xl border-t border-gray-200">
          {onBack ? (
            <>
              <Button
                onClick={onBack}
                variant="ghost"
                className=" w-1/4 rounded-none bg-white rounded-bl-2xl justify-start px-4"
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
    </motion.div>
  )
}
