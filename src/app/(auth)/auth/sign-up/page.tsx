'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LoadingButton from '@/components/ui/loading-button'
import { Separator } from '@/components/ui/separator'
import { ONBOARDING_PERSONAL_INFO, SIGN_IN } from '@/constants/internal.links'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { login, signUp } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { formatPayloadMessage } from '@/utilities/format.payload.message'

const formSchema = z.object({
  email: z.string().min(2, 'First name must be at least 2 characters'),
  password: z.string().min(2, 'Last name must be at least 2 characters'),
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
  const [pending, setPending] = useState(false)

  const email = watch('email')
  const password = watch('password')

  const onSubmit = async (data: FormData) => {
    setPending(true)
    console.log(data)
    const result = await signUp({ email, password, name: email })
    console.log(result)
    const date = new Date()
    if (!result?.error.message) {
      toast('Sign Up Successfull', {
        description: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
        action: {
          label: 'Close',
          onClick: () => console.log('Close'),
        },
      })
      await login({ email, password })
      redirect(ONBOARDING_PERSONAL_INFO)
    } else {
      toast(formatPayloadMessage(result.error.message), {
        description: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
        action: {
          label: 'Close',
          onClick: () => console.log('Close'),
        },
      })
    }
    setPending(false)
    // Handle form submission
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="flex justify-center mb-8">
          <Image src="/logo.svg" alt="Logo" width={80} height={40} className="h-10 w-auto" />
        </div>

        <div className="space-y-2 mb-6">
          <div className="text-sm font-medium text-emerald-600">SIGN UP</div>
          <h1 className="text-2xl font-bold">Get your Passport</h1>
          <p className="text-muted-foreground">
            Get started to have access to the village/community, there’s a lot to explore.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              {email && <Label htmlFor="password">Email Address</Label>}
              <Input
                id="email"
                placeholder="Let’s start with your Email"
                type="text"
                className="mt-1"
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <AnimatePresence>
              {email && email.length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="text" className="mt-1" {...register('password')} />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <LoadingButton pending={pending}>
              CONTINUE
              <ArrowRight size={14} />
            </LoadingButton>
          </div>
        </form>
        {/* Divider */}
        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs ">
            <span className="bg-white px-2 text-gray-500">or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-2 mb-20">
          <Button variant="outline" className="w-full h-12">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <p className="text-gray-400 text-[12px]">
            by clicking ‘continue’ or ‘continue with Google’ you have agreed to the terms and
            condition and privacy policy of Nbari
          </p>
        </div>
        <Link
          href={SIGN_IN}
          className="group mt-10  -m-8 bg-[#F5F5F5] p-4 text-sm h-[65px] flex items-center justify-between rounded-b-2xl hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="flex-1 text-left uppercase text-[14px]">
            <span className="text-gray-500">If you have a account,</span>{' '}
            <span className="text-black  group-hover:underline">Sign in</span>
          </div>
          <ChevronRight
            size={14}
            strokeWidth={3}
            className=" text-black transform transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </div>
  )
}
