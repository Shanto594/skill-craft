import { ToastProvider } from "@/components/providers"
import config from "@/config"
import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: config.APP_NAME,
  description: "A platform for you to made your self a better person",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
