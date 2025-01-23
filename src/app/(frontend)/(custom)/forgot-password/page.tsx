import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'
import { SIGN_IN, SIGN_UP } from "@/constants/internal.links"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px] min-h-[680px] shadow-md relative rounded-2xl flex flex-col">
        <CardContent className="p-12 pb-[77px] space-y-8 flex-grow">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/nbari-logo.svg"
              alt="Moonlight Logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Header */}
          <div className="space-y-1 text-left">
            <p className="text-xs text-gray-600 tracking-widest uppercase mb-2">Forgot Password</p>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Forgot your password?
            </h1>
            <p className="text-sm text-gray-500">
              No worries, we&apos;ll send you reset instructions.
            </p>
          </div>

          {/* Email Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12"
              />
            </div>
            <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white">
              Reset password
            </Button>
          </div>

          {/* Back to Sign In */}
          <Link href={SIGN_IN} className="group inline-flex items-center text-sm text-black hover:underline">
            <ChevronRight className="h-4 w-4 mr-1 transform rotate-180 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to sign in
          </Link>

          {/* Sign Up Link */}
          <Link href={SIGN_UP} className="group absolute bottom-0 left-0 right-0 bg-[#F5F5F5] p-4 text-sm h-[65px] flex items-center justify-between rounded-b-2xl hover:bg-gray-100 transition-colors duration-200">
            <div className="flex-1 text-left">
              <span className="text-gray-500">Don&appos;t have an account?</span>{" "}
              <span className="text-black font-semibold group-hover:underline">Sign up</span>
            </div>
            <ChevronRight className="h-5 w-5 text-black transform transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

