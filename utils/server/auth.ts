import { auth, clerkClient } from '@clerk/nextjs/server'

import { prisma } from './db'

/**
 * Uses Cleck id to retrieve user from database or create it if it doesn't exist.
 */
export const getUserByClerkId = async () => {
  const { userId } = auth()
  if (!userId) {
    throw new Error('User not found')
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  })

  if (!user) {
    const clerkUser = await clerkClient.users.getUser(userId)
    return await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.firstName + ' ' + clerkUser.lastName,
      },
    })
  }

  return user
}
