import { db } from "@/services"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { userId } = auth()
    const { id } = await req.json()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    // check if the user is already a teacher
    const hasTeacher = await db.teacher.findFirst({
      where: {
        userId: id,
      },
    })

    if (!hasTeacher) {
      return new NextResponse("Bad Request", { status: 400 })
    }

    // approve the teacher
    const teacher = await db.teacher.update({
      where: {
        userId: id,
      },
      data: {
        approved: true,
      },
    })

    return NextResponse.json(teacher)
  } catch (error) {
    console.log("[TEACHER]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
