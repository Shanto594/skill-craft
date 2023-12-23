import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

// import { CoursesList } from "@/components/courses-list"

import { SearchInput } from "@/components/ui"
import { db, getCourses } from "@/services"
import { Categories } from "./_components/categories"
import { CoursesList } from "@/components/shared"

const SearchPage = async ({ searchParams }) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const courses = await getCourses({
    userId,
    ...searchParams,
  })

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  )
}

export default SearchPage
