'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import OnboardingLayout from '@/components/onboarding-layout'

export default function Age() {
  const router = useRouter()
  const [birthDate, setBirthDate] = useState('')

  const handleNext = () => {
    if (birthDate) {
      localStorage.setItem('userAge', birthDate)
      router.push('/onboarding/geography')
    }
  }

  return (
    <OnboardingLayout
      category="PERSONAL INFO"
      title="Would love to guess your age but we can't"
      subtitle="We only need this to provide suited content for you"
      onBack={() => router.push('/onboarding/personal-info')}
      onNext={handleNext}
      nextText="CONTINUE TO COUNTRY"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">Age</label>
        <div className="relative">
          <Input
            type="date"
            placeholder="Day Month Year"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="h-12 w-full pr-10 appearance-none"
            style={{
              // @ts-expect-error webkit
              '::-webkit-calendar-picker-indicator': {
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
              },
            }}
          />
        </div>
      </div>
    </OnboardingLayout>
  )
}
