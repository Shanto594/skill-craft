"use client"
import { UserButton, useAuth } from "@clerk/nextjs"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button, SearchInput } from "@/components/ui"
import { isTeacher } from "@/utils"

export const NavbarRoutes = () => {
  const { userId } = useAuth()
  const pathname = usePathname()

  const isBecomeATeacherPage = pathname?.startsWith("/become-a-teacher")
  const isTeacherPage = pathname?.startsWith("/teacher")
  const isCoursePage = pathname?.includes("/courses")
  const isSearchPage = pathname === "/search"

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {!isBecomeATeacherPage && (
          <Link href="/become-a-teacher">
            <Button size="sm" variant="success">
              Become a teacher
            </Button>
          </Link>
        )}
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  )
}
