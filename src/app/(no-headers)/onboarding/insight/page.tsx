'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import OnboardingLayout from '@/components/onboarding-layout'

const sources = [
  'I found you through a friend.',
  'I discovered your service on social media.',
  'I came across your website while searching online.',
  'I heard about you from a podcast.',
  'I saw an advertisement in a magazine.',
  'I learned about you at a networking event.',
  'I received a recommendation from a colleague.',
  'I read reviews on a website.',
  'Others: Please specify.',
]

export default function Insight() {
  const router = useRouter()
  const [selectedSource, setSelectedSource] = useState('')

  const handleNext = () => {
    if (selectedSource) {
      localStorage.setItem('userSource', selectedSource)
      router.push('/onboarding/interest')
    }
  }

  return (
    <OnboardingLayout
      category="INSIGHT"
      title="How did you hear about us?"
      subtitle="You should find your country in this list, select it"
      onBack={() => router.push('/onboarding/geography')}
      onNext={handleNext}
    >
      <div className="space-y-2">
        {sources.map((source) => (
          <Button
            key={source}
            variant="outline"
            onClick={() => setSelectedSource(source)}
            className={`w-full justify-between h-12 ${
              selectedSource === source ? 'bg-black text-white' : ''
            }`}
          >
            {source}
            {selectedSource === source && <Check className="h-4 w-4 ml-2" />}
          </Button>
        ))}
      </div>
    </OnboardingLayout>
  )
}

