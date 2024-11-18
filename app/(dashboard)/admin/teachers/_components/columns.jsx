"use client"
import { ConfirmModal } from "@/components/shared"
import { Badge, Button } from "@/components/ui"
import axios from "axios"
import { ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

// highestDegree: 'Bacholors',
// fieldOfStudy: 'Computer science and engineering',
// institution: 'BUBT University',
// teachingExperience: 'I have almost five years of experience in web development, so I know web development better than anybody else.',
// certifications: 'Web Development\nHtml\nCss\nJS',

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
    accessorKey: "highestDegree",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Highest Degree
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return row.original.highestDegree
    },
  },
  {
    accessorKey: "fieldOfStudy",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Field of Study
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return row.original.fieldOfStudy
    },
  },
  {
    accessorKey: "institution",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Institution
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return row.original.institution
    },
  },
  {
    accessorKey: "teachingExperience",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Teaching Experience
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return row.original.teachingExperience
    },
  },
  {
    accessorKey: "certifications",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Certifications
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return row.original.certifications
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
      console.log(`🔥 | approved:`, approved)

      const router = useRouter()

      const [isLoading, setIsLoading] = useState(false)

      const onApprove = async status => {
        try {
          setIsLoading(true)

          const response = await axios.post(`/api/teacher/approve`, {
            id: row.original.userId,
            status,
          })
          toast.success("Teacher approved")
          router.refresh()
        } catch {
          toast.error("Something went wrong")
        } finally {
          setIsLoading(false)
        }
      }

      if (approved === "APPROVED") return <Badge variant="success">Approved</Badge>

      if (approved === "REJECTED") return <Badge variant="danger">Rejected</Badge>

      return (
        <div className="flex gap-2">
          <ConfirmModal onConfirm={() => onApprove(true)}>
            <Button size="sm" variant="success" disabled={isLoading}>
              Approve
            </Button>
          </ConfirmModal>

          <ConfirmModal onConfirm={() => onApprove(false)}>
            <Button size="sm" variant="danger" disabled={isLoading}>
              Reject
            </Button>
          </ConfirmModal>
        </div>
      )
    },
  },
]
