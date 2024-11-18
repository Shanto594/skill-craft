import { db } from "@/services"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const CourseIdPage = async ({ params }) => {
  const { userId } = auth()
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  })

  if (!course) {
    return redirect("/")
  }

  // const progressCount = await getProgress(userId, course.id)

  // const isAllChaptersCompleted = progressCount === 100

  // if (isAllChaptersCompleted) return null

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`)
}

export default CourseIdPage
