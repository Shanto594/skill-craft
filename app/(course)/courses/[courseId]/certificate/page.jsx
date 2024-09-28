import { db, getProgress } from "@/services"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const CertificatePage = async ({ params }) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: true,
    },
  })

  if (!course) {
    return redirect("/")
  }

  const progressCount = await getProgress(userId, course.id)

  const isAllChaptersCompleted = progressCount === 100

  if (!isAllChaptersCompleted) return redirect(`/courses/${course.id}`)

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[800px] h-[600px] flex flex-col items-center justify-center border-8 border-blue-200">
        <h1 className="text-4xl font-bold text-center mb-8">Certificate of Completion</h1>
        <p className="text-xl mb-4">This certifies that</p>
        <p className="text-3xl font-semibold mb-4">{userId}</p>
        <p className="text-xl mb-8">has successfully completed the course</p>
        <p className="text-3xl font-semibold mb-8">{course.title}</p>
        <p className="text-lg">Date: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default CertificatePage
