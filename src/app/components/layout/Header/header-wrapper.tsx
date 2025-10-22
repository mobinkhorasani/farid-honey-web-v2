'use client'

import { usePathname } from 'next/navigation'
import { Header } from './header'

export const HeaderWrapper = () => {
  const pathname = usePathname()
  const hideHeaderPaths = ['/auth/login', '/auth/register']

  if (hideHeaderPaths.includes(pathname)) return null

  return <Header />
}