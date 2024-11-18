import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export * from "./uploadthing"

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export const isAdmin = userId => {
  return userId === process.env.NEXT_PUBLIC_ADMIN_ID
}

export const formatPrice = price => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export const toNormalCase = string => {
  if (typeof string !== "string") return
  const result = string
    .replace(/[^A-Za-z0-9]/gi, " ")
    .replace(/([A-Z])/g, " $1")
    .trim()
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const toTitleCase = string => toNormalCase(string).replace(/\b\w+/g, word => toNormalCase(word))
