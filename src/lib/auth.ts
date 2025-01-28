'use server'
import { getPayload } from 'payload'
import { cookies, headers as nextHeaders } from 'next/headers'
import configPromise from '@payload-config'

export const login = async ({ email, password }) => {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.login({
      collection: 'users', // required
      data: {
        // required
        email,
        password,
      },
      depth: 2,
      locale: 'en',
      overrideAccess: false,
      showHiddenFields: true,
    })
    const cookieStore = await cookies()
    cookieStore.set('payload-token', result.token as string)
    return result
  } catch (err) {
    return { message: 'Invalid email or password' }
  }
}
export const getAuth = async () => {
  const headers = await nextHeaders()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.auth({ headers })
  return result
}
