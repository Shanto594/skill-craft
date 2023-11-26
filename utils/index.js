import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export * from "./uploadthing"

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export const isTeacher = userId => {
  return userId === process.env.NEXT_PUBLIC_TEACHER_ID
}

export const formatPrice = price => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}
