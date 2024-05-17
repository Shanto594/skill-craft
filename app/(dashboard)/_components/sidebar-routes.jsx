"use client"

import { isAdmin } from "@/utils"
import { useAuth } from "@clerk/nextjs"
import { BarChart, Compass, Layout, List, User } from "lucide-react"
import { usePathname } from "next/navigation"
import SidebarItem from "./sidebar-item"

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]

const adminRoutes = [
  {
    icon: User,
    label: "Teachers",
    href: "/admin/teachers",
  },
]

const SidebarRoutes = () => {
  const { userId } = useAuth()

  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith("/teacher")

  let routes = isTeacherPage ? teacherRoutes : guestRoutes

  if (isAdmin(userId)) {
    routes = [...routes, ...adminRoutes]
  }

  return (
    <div className="flex flex-col w-full">
      {routes.map(route => (
        <SidebarItem key={route.href} {...route} />
      ))}
    </div>
  )
}

export default SidebarRoutes
