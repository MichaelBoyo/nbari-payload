'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { signUpSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SIGN_IN } from '@/constants/internal.links'
import LoadingButton from '@/components/ui/loading-button'
import ErrorMessage from '@/components/ui/error-message'
import { signUp } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function SignUp() {
  const [globalError, setGlobalError] = useState('')

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const result = await signUp(values)
      console.log(result)
      if (!result?.error.message) {
        const date = new Date()
        toast('Sign Up Successfull', {
          description: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
          action: {
            label: 'Close',
            onClick: () => console.log('Close'),
          },
        })
        router.push(SIGN_IN)
      } else {
        setGlobalError(formatMessage(result.error.message))
      }
    } catch (error) {
      setGlobalError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px] min-h-[680px] shadow-md relative rounded-2xl flex flex-col">
        <CardContent className="p-12 pb-[77px] space-y-8 flex-grow">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo.svg"
              alt="Moonlight Logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Header */}
          <div className="space-y-1 text-left">
            <p className="text-xs text-gray-600 tracking-widest uppercase mb-2">Sign Up</p>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Create your account
            </h1>
            <p className="text-sm text-gray-500">Join the community and start learning</p>
          </div>

          {/* Signup Form */}
          {globalError && <ErrorMessage error={globalError} />}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {['name', 'email', 'password', 'confirmPassword'].map((field) => (
                <FormField
                  control={form.control}
                  key={field}
                  name={field as keyof z.infer<typeof signUpSchema>}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                      <FormControl>
                        <Input
                          type={
                            field.includes('password')
                              ? 'password'
                              : field === 'email'
                                ? 'email'
                                : 'text'
                          }
                          placeholder={`Enter your ${field}`}
                          {...fieldProps}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <LoadingButton pending={form.formState.isSubmitting}>Sign up</LoadingButton>
            </form>
          </Form>
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
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
              Continue with Google
            </Button>
          </div>

          {/* Sign In Link */}
          <Link
            href={SIGN_IN}
            className="group absolute bottom-0 left-0 right-0 bg-[#F5F5F5] p-4 text-sm h-[65px] flex items-center justify-between rounded-b-2xl hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex-1 text-left">
              <span className="text-gray-500">Already have an account?</span>{' '}
              <span className="text-black font-semibold group-hover:underline">Sign in</span>
            </div>
            <ChevronRight className="h-5 w-5 text-black transform transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

const formatMessage = (message: string) => {
  switch (message) {
    case 'The following field is invalid: email':
      return 'Email already registered'

    default:
      return message
  }
}
