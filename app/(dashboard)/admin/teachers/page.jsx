import { db } from "@/services"
import { auth, clerkClient } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

const getData = async () => {
  const users = await clerkClient.users.getUserList()

  const teachers = await db.teacher.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const teachersWithUsers = teachers.map(teacher => {
    const user = users.find(user => user.id === teacher.userId)
    return {
      ...teacher,
      user: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
    }
  })

  return teachersWithUsers
}

const TeachersPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const teachers = await getData()

  return (
    <div className="p-6">
      <DataTable columns={columns} data={teachers} />
    </div>
  )
}

export default TeachersPage
