import { Feed } from '@/components/custom/feed'
import { SIGN_IN } from '@/constants/internal.links'
import { getAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const LandingPage = async () => {
  const auth = await getAuth()
  if (!auth.user) {
    return redirect(SIGN_IN)
  }
  return <Feed />
}
export default LandingPage
