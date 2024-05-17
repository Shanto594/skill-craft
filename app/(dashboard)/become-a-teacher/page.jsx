"use client"
import { Button, Form } from "@/components/ui"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const Create = () => {
  const router = useRouter()
  const form = useForm()

  const { isSubmitting } = form.formState

  const onSubmit = async () => {
    try {
      const response = await axios.post("/api/teacher")
      router.push(`/`)
      toast.success("Your application has been submitted successfully")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Become a teacher</h1>
        <p className="text-sm text-slate-600">
          Become a teacher and start creating your own courses. And earn money while teaching in our platform.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                Apply
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Create
