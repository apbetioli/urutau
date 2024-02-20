import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-black m-auto">
      <SignIn />
    </div>
  )
}
