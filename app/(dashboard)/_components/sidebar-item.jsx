import { cn } from "@/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SidebarItem = ({ icon: Icon, label, href }) => {
  const pathname = usePathname()
  const isActive = pathname === href || (pathname === "/" && href === "/") || pathname?.startsWith(`${href}/`)
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-medium px-6 py-4 transition-all hover:text-slate-600",
        {
          "bg-gray-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700 border-r-2 border-sky-700": isActive,
        }
      )}>
      <Icon className="w-6 h-6 mr-3" />
      {label}
    </Link>
  )
}
export default SidebarItem
