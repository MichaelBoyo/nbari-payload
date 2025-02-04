'use client'

import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserData {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  country: string;
  source: string;
  interests: string[];
}

export default function Page() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    const userAge = localStorage.getItem('userAge') || ''
    const userCountry = localStorage.getItem('userCountry') || ''
    const userSource = localStorage.getItem('userSource') || ''
    const userInterests = JSON.parse(localStorage.getItem('userInterests') || '[]')

    setUserData({
      ...userInfo,
      birthDate: userAge,
      country: userCountry,
      source: userSource,
      interests: userInterests,
    })

  }, [])



  if (!userData) {
    return <div>Loading...</div>
  }



  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px] h-[680px] shadow-md relative rounded-2xl flex flex-col">
        <CardContent className="p-6 space-y-4 flex-grow flex flex-col items-center justify-between text-center">
          <h1 className="text-3xl font-bold">
            {userData.firstName}, Welcome to Nbari
          </h1>
          <h2 className="text-2xl font-semibold">
            Here&appos;s your Digital Passport
          </h2>
          <p className="text-gray-500 mb-8">
            Your journey in the Nbari Kingdom begins here
          </p>


        </CardContent>
      </Card>
    </div>
  )
}