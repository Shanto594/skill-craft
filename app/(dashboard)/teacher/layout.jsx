import { isTeacher } from "@/services"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const TeacherLayout = async ({ children }) => {
  const { userId } = auth()

  const isUserTeacher = await isTeacher(userId)

  if (!isUserTeacher) {
    return redirect("/")
  }

  return children
}
export default TeacherLayout
