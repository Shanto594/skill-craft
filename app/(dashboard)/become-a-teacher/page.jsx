"use client"
import { Button, Form, Input, Textarea } from "@/components/ui"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const Create = () => {
  const router = useRouter()
  const form = useForm()

  const { isSubmitting } = form.formState

  const onSubmit = async data => {
    try {
      const response = await axios.post("/api/teacher", data)
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
          Become a teacher and start creating your own courses. Share your expertise and earn money while teaching on
          our platform.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <div>
              <label htmlFor="highestDegree" className="mb-2 block text-sm font-medium text-gray-700">
                Highest Degree
              </label>
              <Input
                id="highestDegree"
                placeholder="e.g., Bachelor's, Master's, Ph.D."
                {...form.register("highestDegree", { required: "Highest degree is required" })}
              />
            </div>
            <div>
              <label htmlFor="fieldOfStudy" className="mb-2 block text-sm font-medium text-gray-700">
                Field of Study
              </label>
              <Input
                id="fieldOfStudy"
                placeholder="e.g., Computer Science, Mathematics, Physics"
                {...form.register("fieldOfStudy", { required: "Field of study is required" })}
              />
            </div>
            <div>
              <label htmlFor="institution" className="mb-2 block text-sm font-medium text-gray-700">
                University/Institution
              </label>
              <Input
                id="institution"
                placeholder="e.g., Harvard University, MIT, Stanford"
                {...form.register("institution", { required: "Institution is required" })}
              />
            </div>
            <div>
              <label htmlFor="teachingExperience" className="mb-2 block text-sm font-medium text-gray-700">
                Teaching Experience
              </label>
              <Textarea
                id="teachingExperience"
                placeholder="Describe your teaching experience, including years of experience, subjects taught, and any notable achievements."
                {...form.register("teachingExperience", { required: "Teaching experience is required" })}
              />
            </div>
            <div>
              <label htmlFor="certifications" className="mb-2 block text-sm font-medium text-gray-700">
                Relevant Certifications
              </label>
              <Textarea
                id="certifications"
                placeholder="List any relevant certifications or additional qualifications you have (optional)."
                {...form.register("certifications")}
              />
            </div>
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
