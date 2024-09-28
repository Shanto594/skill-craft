import { db, getProgress } from "@/services"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { CertificateName } from "./_components/CertificateName"
import Image from "next/image"

const CertificatePage = async ({ params }) => {
  const { userId, ...rest } = auth()
  // const user = useUser()

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

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full border-8 border-blue-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">Certificate of Completion</h1>
          <p className="text-gray-600">This certifies that</p>
        </div>

        <div className="text-center mb-8">
          <CertificateName />
          {/* <h2 className="text-4xl font-serif text-gray-800">{user?.name}</h2> */}
          <p className="text-gray-600 mt-2">has successfully completed the course</p>
          <h3 className="text-2xl font-semibold text-indigo-600 mt-2">{course.title}</h3>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="mb-6">
            <p className="text-gray-600 text-center">Date Completed:</p>
            <p className="font-semibold text-center">{formattedDate}</p>
          </div>
          <div>
            <Image src="/logo.svg" alt="Company Logo" width={100} height={100} className="rounded-full" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Congratulations on your achievement!</p>
        </div>
      </div>
    </div>
  )
}

export default CertificatePage
