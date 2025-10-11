'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("auth_user")

    if (!userData) {
      router.push("/")
      return
    }

    const user = JSON.parse(userData)

    if (user.role !== "ADMIN") {
      router.push("/")
    }
  }, [router])

  return <>{children}</>
}
