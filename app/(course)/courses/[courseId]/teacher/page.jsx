import { BackButton } from "@/components/ui"
import { db } from "@/services"
import { cn, toTitleCase } from "@/utils"
import { auth, clerkClient } from "@clerk/nextjs"
import { CheckCircle, XCircle } from "lucide-react"
import { redirect } from "next/navigation"

const getUser = async userId => {
  const users = await clerkClient.users.getUserList()
  const user = users.find(user => user.id === userId)
  return {
    ...user,
    email: user.emailAddresses[0].emailAddress,
  }
}

const CourseTeacher = async ({ params }) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      teacher: true,
    },
  })

  if (!course) {
    return redirect("/")
  }

  if (!course.teacher) {
    return redirect("/")
  }

  const teacher = course.teacher
  const user = await getUser(course.teacher.userId)

  return (
    <div className="max-w-4xl mx-auto p-8">
      <BackButton text="Back to Chapters" />
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 p-6">
          <h1 className="text-3xl font-bold text-white">Teacher Profile</h1>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Education Section */}
          <div>
            <div className="flex mb-5">
              <img src={user.imageUrl} alt={user.firstName} className="w-24 h-w-24 rounded-full object-cover" />
              <div className="flex flex-col justify-center ml-4">
                <div className="text-lg font-semibold">{toTitleCase(`${user.firstName} ${user.lastName}`)}</div>
                <div className="text-gray-500">{user.email}</div>
                <div className="flex items-center mt-1">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-sm flex items-center gap-2",
                      teacher.approved === "APPROVED" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}>
                    {teacher.approved === "APPROVED" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    {teacher.approved === "APPROVED" ? "Approved Teacher" : "Pending Approval"}
                  </span>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Education</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Degree:</span> {teacher.highestDegree}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Field of Study:</span> {teacher.fieldOfStudy}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Institution:</span> {teacher.institution}
              </p>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Teaching Experience</h2>
            <p className="text-gray-700">{teacher.teachingExperience}</p>
          </div>

          {/* Certifications Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Certifications</h2>
            <div className="flex flex-wrap gap-2">{teacher.certifications}</div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-100 px-6 py-4">
          <p className="text-sm text-gray-600">Member since {new Date(teacher.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseTeacher
