import { auth } from "@clerk/nextjs"
import Link from "next/link"
import { redirect } from "next/navigation"

import { CourseProgress } from "@/components/shared"
import { Button } from "@/components/ui"
import { db } from "@/services"
import { CheckCircle } from "lucide-react"
import { CourseSidebarItem } from "./course-sidebar-item"
import { CourseTeacher } from "./course-teacher"

export const CourseSidebar = async ({ course, progressCount }) => {
  const { userId } = auth()

  if (!userId) return redirect("/")

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  })

  const isAllChaptersCompleted = progressCount === 100

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <CourseTeacher course={course} />

      <div className="flex flex-col w-full">
        {course.chapters.map(chapter => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
      {isAllChaptersCompleted && (
        <div className="mt-auto p-4">
          <Link href={`/courses/${course.id}/certificate`}>
            <Button className="w-full" variant="success">
              <CheckCircle className="h-4 w-4 mr-2" />
              View Certificate
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
