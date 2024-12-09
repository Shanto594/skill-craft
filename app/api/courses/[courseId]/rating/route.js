import { db } from "@/services"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

// add rating to course
export async function POST(req, { params }) {
  try {
    const { userId } = auth()
    const { rating } = await req.json()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    })

    if (!course) {
      return new NextResponse("Not found", { status: 404 })
    }

    // Check if rating exists
    const existingRating = await db.rating.findFirst({
      where: {
        userId,
        courseId: params.courseId,
      },
    })

    let courseRating

    if (existingRating) {
      // Update existing rating
      courseRating = await db.rating.update({
        where: {
          id: existingRating.id,
        },
        data: {
          rating,
        },
      })
    } else {
      // Create new rating
      courseRating = await db.rating.create({
        data: {
          userId,
          courseId: params.courseId,
          rating,
        },
      })
    }

    return NextResponse.json(courseRating)
  } catch (error) {
    console.log("[COURSE_RATING_CREATE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
