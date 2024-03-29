import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/soon',
    '/feed',
    '/api/image/(.*)',
    '/api/speech/(.*)',
    '/stories/(.*)',
    '/api/stories(.*)',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
