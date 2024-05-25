"use client"
import { UserButton } from "@clerk/nextjs"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button, SearchInput } from "@/components/ui"

export const NavbarLinks = ({ teacherButton, becomeATeacher }) => {
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
        {!isBecomeATeacherPage && becomeATeacher}
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          teacherButton
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  )
}
