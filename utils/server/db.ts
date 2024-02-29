import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? [] : ['query'],
  })

// This is a workaround for next hot-reloading causing issues with the db connection when developing
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
