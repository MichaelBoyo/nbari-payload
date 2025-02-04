'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import OnboardingLayout from '@/components/onboarding-layout'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  gender: z.enum(['male', 'female', 'prefer-not-to-say']),
})

type FormData = z.infer<typeof formSchema>

export default function ProgressiveForm() {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  const router = useRouter()
  const [gender, setGender] = useState<'male' | 'female' | 'prefer-not-to-say' | ''>('')
  const [selectedPosition, setSelectedPosition] = useState(0)

  const firstName = watch('firstName')
  const lastName = watch('lastName')

  const onSubmit = (data: FormData) => {
    console.log(data)
    // Handle form submission
  }
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" className="mt-1" {...register('firstName')} />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <AnimatePresence>
            {firstName && firstName.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="lastName">Surname (Last name)</Label>
                <Input id="lastName" type="text" className="mt-1" {...register('lastName')} />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {lastName && lastName.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <div className="flex rounded-md border border-gray-200 relative">
                    <div
                      className="absolute top-0 bottom-0 bg-primary transition-all duration-300 ease-in-out"
                      style={{
                        width: '33.333%',
                        left: `${selectedPosition * 33.333}%`,
                        zIndex: 0,
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className={`flex-1 rounded-none transition-colors duration-300 relative z-10 ${
                        gender === 'male' ? 'text-white' : 'text-black hover:text-black/70'
                      }`}
                      onClick={() => {
                        setGender('male')
                        setSelectedPosition(0)
                      }}
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
                      onClick={() => {
                        setGender('female')
                        setSelectedPosition(1)
                      }}
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
                      onClick={() => {
                        setGender('prefer-not-to-say')
                        setSelectedPosition(2)
                      }}
                    >
                      Prefer not to say
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </OnboardingLayout>
  )
}
