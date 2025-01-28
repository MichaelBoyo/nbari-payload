import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}

export const admin: isAuthenticated = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}

export const checkRole = (allRoles: string[], user?: User | null): boolean => {
  if (user && allRoles?.length) {
    if (
      allRoles.some((role) => {
        return user?.roles?.some((individualRole) => {
          return individualRole === role
        })
      })
    )
      return true
  }

  return false
}
