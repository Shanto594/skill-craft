"use client"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { Star } from "lucide-react"
import { useState } from "react"

export const CourseRating = ({ course, userId }) => {
  const myRating = course.ratings.find(rating => rating.userId === userId)
  const [rating, setRating] = useState(myRating?.rating || 0)
  const [hoverRating, setHoverRating] = useState(0)

  const handleRatingChange = async rating => {
    setRating(rating)
    await axios.post(`/api/courses/${course.id}/rating`, { rating })
  }

  return (
    <div className="py-3">
      <h2 className="text-sm font-semibold text-center mb-1">Rate this course</h2>
      <div className="p-3 bg-gray-100 rounded-full">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              className="text-yellow-400 hover:scale-110 transition px-1"
              onClick={() => handleRatingChange(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}>
              <Star className={`h-6 w-6 ${(hoverRating || rating) >= star ? "fill-yellow-400" : "fill-transparent"}`} />
            </button>
          ))}
          <p className="text-sm text-gray-500 mx-auto">{rating || hoverRating} out of 5</p>
        </div>
      </div>
    </div>
  )
}
