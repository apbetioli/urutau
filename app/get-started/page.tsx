import { UserButton } from '@clerk/nextjs'

export default function GetStarted() {
  return (
    <div>
      <h1>Welcome!</h1>
      <UserButton />
    </div>
  )
}
