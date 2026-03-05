import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Dev Clarity - AI-Powered Code Analysis & Repair",
  description:
    "Transform your code with AI-powered precision. Automated analysis, intelligent fixing, and comprehensive testing for every programming language.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>{children}</body>
    </html>
  )
}
