"use client"
import config from "@/config"
import { Crisp } from "crisp-sdk-web"
import Script from "next/script"
import { useEffect } from "react"

export const CrispChatProvider = () => {
  useEffect(() => {
    Crisp.configure(config.CRISP_WEBSITE_ID)
  }, [])

  return null
}
