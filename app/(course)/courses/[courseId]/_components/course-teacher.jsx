import { toTitleCase } from "@/utils"
import { clerkClient } from "@clerk/nextjs"
import Link from "next/link"

const getUser = async userId => {
  const users = await clerkClient.users.getUserList()
  const user = users.find(user => user.id === userId)
  return {
    ...user,
    email: user.emailAddresses[0].emailAddress,
  }
}

export const CourseTeacher = async ({ course }) => {
  if (!course?.teacher) return null

  const user = await getUser(course.teacher.userId)

  return (
    <Link className="p-8 flex flex-col border-b" href={`/courses/${course.id}/teacher`}>
      <div className="flex">
        <img src={user.imageUrl} alt={user.firstName} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex flex-col justify-center ml-2">
          <div className="font-semibold">{toTitleCase(`${user.firstName} ${user.lastName}`)}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
    </Link>
  )
}
