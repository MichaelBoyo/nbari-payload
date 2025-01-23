'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import OnboardingLayout from '@/components/onboarding-layout'

const countries = [
  'South Africa',
  'Egypt',
  'Kenya',
  'Nigeria',
  'Morocco',
  'Tanzania',
  'Eritrea',
  'Burundi',
  'Zambia',
  'Ghana',
]

export default function Geography() {
  const router = useRouter()
  const [selectedCountry, setSelectedCountry] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNext = () => {
    if (selectedCountry) {
      localStorage.setItem('userCountry', selectedCountry)
      router.push('/onboarding/insight')
    }
  }

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <OnboardingLayout
      category="GEOGRAPHY"
      title="What country do you live in?"
      subtitle="Check out this list and pick your country!"
      onBack={() => router.push('/onboarding/age')}
      onNext={handleNext}
    >
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Search for your country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {filteredCountries.map((country) => (
            <Button
              key={country}
              variant={selectedCountry === country ? 'default' : 'outline'}
              onClick={() => setSelectedCountry(country)}
              className="w-full justify-start"
            >
              {country}
            </Button>
          ))}
        </div>
        {filteredCountries.length === 0 && (
          <p className="text-center text-gray-500">No countries found</p>
        )}
      </div>
    </OnboardingLayout>
  )
}
