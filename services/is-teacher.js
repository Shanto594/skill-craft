import { db } from "./db"

export const isTeacher = async (userId, approved = true) => {
  try {
    const teacher = await db.teacher.findMany({
      where: {
        userId: userId,
        approved,
      },
      select: {
        id: true,
        approved: true,
      },
    })

    return teacher.length > 0
  } catch (error) {
    console.log("[TEACHER]", error)
    return false
  }
}
