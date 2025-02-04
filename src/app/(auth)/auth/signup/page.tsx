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
import ErrorMessage from '@/components/ui/error-message'
import LoadingButton from '@/components/ui/loading-button'
import { Separator } from '@/components/ui/separator'
import { ONBOARDING_PERSONAL_INFO, SIGN_IN } from '@/constants/internal.links'
import { login, signUp } from '@/lib/auth'
import { signUpSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { formatPayloadMessage } from '@/utilities/format.payload.message'

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
  const [list, setList] = useState([{ name: 'email', placeHolder: 'Let’s start with your Email' }])

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
        await login(values)
        router.push(ONBOARDING_PERSONAL_INFO)
      } else {
        setGlobalError(formatPayloadMessage(result.error.message))
      }
    } catch (error) {
      setGlobalError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px] min-h-[680px] shadow-md bg-white relative rounded-2xl flex flex-col">
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
            <p className="text-xs text-success font-[600] tracking-widest uppercase mb-2">
              Sign Up
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Get your Passport
            </h1>
            <p className="text-sm text-gray-500">
              Get started to have access to the village/community, there’s a lot to explore.
            </p>
          </div>

          {/* Signup Form */}
          {globalError && <ErrorMessage error={globalError} />}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {list.map((field) => (
                <FormField
                  control={form.control}
                  key={field.name}
                  name={field.name as keyof z.infer<typeof signUpSchema>}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      {/* <FormLabel>
                        {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                      </FormLabel> */}
                      <FormControl>
                        <Input
                          type={
                            field.name.includes('password')
                              ? 'password'
                              : field.name === 'email'
                                ? 'email'
                                : 'text'
                          }
                          placeholder={field.placeHolder}
                          {...fieldProps}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <LoadingButton pending={form.formState.isSubmitting}>
                CONTINUE
                <ArrowRight size={14} />
              </LoadingButton>
            </form>
          </Form>
          {/* Divider */}
          <div className="relative">
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

          {/* Sign In Link */}
          <Link
            href={SIGN_IN}
            className="group absolute bottom-0 left-0 right-0 bg-[#F5F5F5] p-4 text-sm h-[65px] flex items-center justify-between rounded-b-2xl hover:bg-gray-100 transition-colors duration-200"
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
        </CardContent>
      </Card>
    </div>
  )
}
