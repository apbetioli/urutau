import { auth, clerkClient } from '@clerk/nextjs'

import { prisma } from './db'

export const getUserByClerkId = async () => {
  const { userId } = auth()
  if (userId) {
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
        },
      })
    }

    return user
  }
}
