import { UserButton } from '@clerk/nextjs'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <aside className="w-24 h-full border-r border-gray-700 p-4">Menu</aside>
      <main className="h-full w-full">
        <header className="h-12 flex justify-between border-b border-gray-700 items-center p-4">
          <h1>Urutau</h1>
          <UserButton afterSignOutUrl="/" />
        </header>
        <div className="p-4">{children}</div>
      </main>
    </>
  )
}
