import { NavbarLinks } from "./navbar-links"

import { Badge, Button } from "@/components/ui"
import { db, isTeacher } from "@/services"
import { auth } from "@clerk/nextjs"
import Link from "next/link"

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

  const teacher = await db.teacher.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      approved: true,
    },
  })

  const isUserTeacher = teacher.length > 0 && teacher[0].approved === "APPROVED"
  if (isUserTeacher) return null

  const isUserApplied = teacher.length > 0 && teacher[0].approved === "PENDING"

  if (isUserApplied) return <Badge variant="success">Applied for teacher</Badge>

  const isUserRejected = teacher.length > 0 && teacher[0].approved === "REJECTED"

  if (isUserRejected) return <Badge variant="danger">Your application was rejected</Badge>

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
