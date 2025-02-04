'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import OnboardingLayout from '@/components/onboarding-layout'

const interests = [
  'Illustration Artist',
  'Video Producer',
  'Game Designer',
  'Brand Strategist',
  'Digital Marketing Specialist',
  'Motion Graphics Designer',
  'Creative Director',
]

export default function Interest() {
  const router = useRouter()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleNext = () => {
    if (selectedInterests.length > 0) {
      localStorage.setItem('userInterests', JSON.stringify(selectedInterests))
      router.push('/onboarding/passport')
    }
  }

  return (
    <OnboardingLayout
      category="INTEREST"
      title="Outside work, what are you interested in?"
      subtitle="To tailor your experience to you, what's your interest. You can select more than one"
      onBack={() => router.push('/onboarding/insight')}
      onNext={handleNext}
      nextText="CONTINUE TO MY PASSPORT"
    >
      <div className="space-y-2">
        {interests.map((interest) => (
          <Button
            key={interest}
            variant="outline"
            onClick={() => toggleInterest(interest)}
            className={`w-full justify-between h-12 ${
              selectedInterests.includes(interest) ? 'bg-black text-white' : ''
            }`}
          >
            {interest}
            {selectedInterests.includes(interest) && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </Button>
        ))}
      </div>
    </OnboardingLayout>
  )
}

