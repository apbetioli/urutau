import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import HomePage from '@/app/page'
import { PropsWithChildren } from 'react'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' }),
      ),
    ClerkProvider: ({ children }: PropsWithChildren) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'John Doe',
      },
    }),
  }
})

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  }
})

test(`Home`, () => {
  render(HomePage())
  expect(screen.getByText('Get started')).toBeTruthy()
})
