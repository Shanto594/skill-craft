import { db } from "@/services"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    // check if the user is already a teacher
    const teacher = await db.teacher.findFirst({
      where: {
        userId,
      },
    })

    if (teacher) {
      return new NextResponse("You are already a teacher", { status: 400 })
    }

    const course = await db.teacher.create({
      data: {
        userId,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log("[BECOME-A-TEACHER]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
