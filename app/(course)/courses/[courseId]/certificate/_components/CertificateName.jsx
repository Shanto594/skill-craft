"use client"

import { useUser } from "@clerk/nextjs"

export const CertificateName = () => {
  const {
    user: { firstName, lastName },
  } = useUser()

  return (
    <p className="text-3xl font-semibold mb-4">
      {firstName} {lastName}
    </p>
  )
}
