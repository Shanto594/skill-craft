"use client"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const BackButton = ({ text = "Go Back" }) => {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-4 flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
      <ChevronLeft className="h-4 w-4 mr-1" />
      {text}
    </button>
  )
}
