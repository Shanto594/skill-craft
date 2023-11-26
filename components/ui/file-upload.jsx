"use client"
import { UploadDropzone } from "@/utils"
import toast from "react-hot-toast"

export const FileUpload = ({ onChange, endpoint }) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={res => {
        onChange(res?.[0].url)
      }}
      onUploadError={error => {
        toast.error(`${error?.message}`)
      }}
    />
  )
}
