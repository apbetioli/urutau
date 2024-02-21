import { User } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs'
import { prisma } from '@/utils/db'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  // There'll always be a user here, this is a protected url
  const user = (await currentUser()) as User

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/get-started')
}

export default createNewUser
