import { NavbarLinks } from "./navbar-links"

import { isTeacher } from "@/services"
import { auth } from "@clerk/nextjs"
import Link from "next/link"
import { Badge, Button } from "../../ui"

const TeacherButton = async () => {
  const { userId } = auth()

  const isUserTeacher = await isTeacher(userId)

  if (!isUserTeacher) return null

  return (
    <Link href="/teacher/courses">
      <Button size="sm" variant="success">
        Teacher Dashboard
      </Button>
    </Link>
  )
}

const BecomeATeacher = async () => {
  const { userId } = auth()

  const isUserTeacher = await isTeacher(userId)
  if (isUserTeacher) return null

  const isUserApplied = await isTeacher(userId, false)

  if (isUserApplied) return <Badge variant="success">Applied for teacher</Badge>

  return (
    <Link href="/become-a-teacher">
      <Button size="sm" variant="success">
        Become a teacher
      </Button>
    </Link>
  )
}

export const NavbarRoutes = () => {
  return <NavbarLinks teacherButton={<TeacherButton />} becomeATeacher={<BecomeATeacher />} />
}
