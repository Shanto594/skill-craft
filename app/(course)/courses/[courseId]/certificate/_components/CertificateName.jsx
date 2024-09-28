"use client"

import { useUser } from "@clerk/nextjs"

export const CertificateName = () => {
  const { user } = useUser()

  return (
    <p className="text-3xl font-semibold mb-4">
      {user?.firstName} {user?.lastName}
    </p>
  )
}
