"use client"
import { ConfirmModal } from "@/components/shared"
import { Badge, Button } from "@/components/ui"
import axios from "axios"
import { ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export const columns = [
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const user = row.original.user

      return (
        <div className="flex">
          <img src={user.imageUrl} alt={user.firstName} className="w-8 h-8 rounded-full object-cover" />
          <div className="flex flex-col justify-center ml-2">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div className="text-gray-500">{user.email}</div>
            <div className="text-gray-500">{user.id}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "approved",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Approved
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const approved = row.getValue("approved")
      const router = useRouter()

      const [isLoading, setIsLoading] = useState(false)

      const onApprove = async () => {
        try {
          setIsLoading(true)

          const response = await axios.post(`/api/teacher/approve`, {
            id: row.original.userId,
          })
          toast.success("Teacher approved")
          router.refresh()
        } catch {
          toast.error("Something went wrong")
        } finally {
          setIsLoading(false)
        }
      }

      return approved ? (
        <Badge variant="success">Approved</Badge>
      ) : (
        <ConfirmModal onConfirm={onApprove}>
          <Button variant="outline" disabled={isLoading}>
            Approve
          </Button>
        </ConfirmModal>
      )
    },
  },
]
