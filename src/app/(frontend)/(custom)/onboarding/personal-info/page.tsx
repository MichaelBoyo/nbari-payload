'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import OnboardingLayout from '@/components/onboarding-layout'

export default function PersonalInfo() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | 'prefer-not-to-say' | ''>('')
  const [selectedPosition, setSelectedPosition] = useState(0)

  const handleNext = () => {
    if (firstName && lastName && gender) {
      localStorage.setItem('userInfo', JSON.stringify({ firstName, lastName, gender }))
      router.push('/onboarding/age')
    }
  }

  return (
    <OnboardingLayout
      category="PERSONAL INFO"
      title="Tell us a bit about yourself"
      subtitle="First of all introduction, we want to get to know you more."
      onNext={handleNext}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <Input
            placeholder="What's your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Surname (Last name)</label>
          <Input
            placeholder="What's your Surname (some call it father's name)"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Gender</label>
          <div className="flex rounded-md border border-gray-200 relative">
            <div 
              className="absolute top-0 bottom-0 bg-primary transition-all duration-300 ease-in-out" 
              style={{ 
                width: '33.333%', 
                left: `${selectedPosition * 33.333}%`,
                zIndex: 0
              }} 
            />
            <Button
              type="button"
              variant="ghost"
              className={`flex-1 rounded-none transition-colors duration-300 relative z-10 ${
                gender === 'male' 
                  ? 'text-primary-foreground' 
                  : 'text-black hover:text-black/70'
              }`}
              onClick={() => { setGender('male'); setSelectedPosition(0); }}
            >
              Male
            </Button>
            <div className="w-px bg-gray-200 z-20" />
            <Button
              type="button"
              variant="ghost"
              className={`flex-1 rounded-none transition-colors duration-300 relative z-10 ${
                gender === 'female' 
                  ? 'text-primary-foreground' 
                  : 'text-black hover:text-black/70'
              }`}
              onClick={() => { setGender('female'); setSelectedPosition(1); }}
            >
              Female
            </Button>
            <div className="w-px bg-gray-200 z-20" />
            <Button
              type="button"
              variant="ghost"
              className={`flex-1 rounded-none transition-colors duration-300 relative z-10 ${
                gender === 'prefer-not-to-say' 
                  ? 'text-primary-foreground' 
                  : 'text-black hover:text-black/70'
              }`}
              onClick={() => { setGender('prefer-not-to-say'); setSelectedPosition(2); }}
            >
              Prefer not to say
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  )
}

