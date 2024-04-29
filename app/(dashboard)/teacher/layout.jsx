import { isTeacher } from "@/utils"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const TeacherLayout = ({ children }) => {
  const { userId } = auth()

  if (!isTeacher(userId)) {
    return redirect("/")
  }

  return children
}
export default TeacherLayout
