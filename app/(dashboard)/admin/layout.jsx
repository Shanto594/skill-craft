import { isAdmin } from "@/utils"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const AdminLayout = ({ children }) => {
  const { userId } = auth()

  if (!isAdmin(userId)) {
    return redirect("/")
  }

  return children
}
export default AdminLayout
