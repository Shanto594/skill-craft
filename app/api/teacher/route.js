import { db } from "@/services"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { userId } = auth()
    const { highestDegree, fieldOfStudy, institution, teachingExperience, certifications } = await req.json()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if the user has already applied to be a teacher
    const existingApplication = await db.teacher.findFirst({
      where: {
        userId,
      },
    })

    if (existingApplication) {
      return new NextResponse("You have already applied to be a teacher", { status: 400 })
    }

    // Create a new teacher application
    const teacher = await db.teacher.create({
      data: {
        userId,
        highestDegree,
        fieldOfStudy,
        institution,
        teachingExperience,
        certifications,
        approved: false, // Set to false by default, admin will approve later
      },
    })

    return NextResponse.json(teacher)
  } catch (error) {
    console.log("[TEACHER]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
