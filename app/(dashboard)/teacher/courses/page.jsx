import { db } from "@/services"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

const getData = async userId => {
  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return courses
}

const CoursesPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const courses = await getData(userId)

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  )
}

export default CoursesPage
