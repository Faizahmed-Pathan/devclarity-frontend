"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Code, ArrowLeft, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      // Default to dark mode
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    document.documentElement.classList.toggle("dark", newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  const handleEmailLogin = async () => {
    console.log("Email login attempted with:", { email, password })
    // Firebase authentication logic will go here
    if (email && password) {
      console.log("[v0] Login successful, redirecting to dashboard")
      router.push("/dashboard")
    }
  }

  const handleGoogleSignIn = async () => {
    console.log("Google sign-in attempted")
    // Firebase Google authentication logic will go here
    console.log("[v0] Google sign-in successful, redirecting to dashboard")
    router.push("/dashboard")
  }

  const codeLines = [
    "import React from 'react'",
    "const authenticate = async (user) => {",
    "  const token = await generateJWT(user)",
    "  return { success: true, token }",
    "}",
    "export default function Dashboard() {",
    "  const [user, setUser] = useState(null)",
    "  useEffect(() => {",
    "    fetchUserData()",
    "  }, [])",
    "  return <div>Welcome {user?.name}</div>",
    "}",
    "const apiCall = fetch('/api/users')",
    "console.log('Server running on port 3000')",
    "npm install @types/react",
    "git commit -m 'Add authentication'",
    "docker build -t app:latest .",
    "kubectl apply -f deployment.yaml",
    "const db = new Database()",
    "SELECT * FROM users WHERE active = true",
    "CREATE TABLE sessions (",
    "  id SERIAL PRIMARY KEY,",
    "  user_id INTEGER,",
    "  created_at TIMESTAMP",
    ")",
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <Link
        href="/"
        className="absolute top-4 left-4 z-30 flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back to Home</span>
      </Link>

      <Button variant="ghost" size="sm" onClick={toggleTheme} className="absolute top-4 right-4 z-30 h-9 w-9 p-0">
        {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, columnIndex) => (
          <div
            key={columnIndex}
            className="absolute top-0 font-mono text-sm whitespace-nowrap"
            style={{
              left: `${columnIndex * 15}%`,
              animationDelay: `${columnIndex * 2}s`,
              animation: `scrollCode 20s linear infinite`,
              color: isDarkMode ? "rgba(34, 197, 94, 0.4)" : "rgba(34, 197, 94, 0.6)",
            }}
          >
            {Array.from({ length: 50 }, (_, lineIndex) => (
              <div
                key={lineIndex}
                className="py-1"
                style={{
                  animationDelay: `${lineIndex * 0.5}s`,
                  animation: `fadeInOut 8s ease-in-out infinite`,
                }}
              >
                {codeLines[(columnIndex + lineIndex) % codeLines.length]}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md relative z-20 bg-background/95 backdrop-blur-sm border-2">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Dev Clarity</span>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground">Access your AI-powered code assistant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleEmailLogin} className="w-full" size="lg">
              Log In
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button onClick={handleGoogleSignIn} variant="outline" className="w-full bg-transparent" size="lg">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 1c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>

          <div className="text-center space-y-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Forgot Password?
            </a>
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-foreground hover:underline font-medium">
                Sign Up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes scrollCode {
          0% { 
            transform: translateY(100vh); 
          }
          100% { 
            transform: translateY(-100vh); 
          }
        }
        @keyframes fadeInOut {
          0%, 10% { 
            opacity: ${isDarkMode ? "0.3" : "0.4"}; 
          }
          50% { 
            opacity: ${isDarkMode ? "0.7" : "0.9"}; 
          }
          90%, 100% { 
            opacity: ${isDarkMode ? "0.3" : "0.4"}; 
          }
        }
      `}</style>
    </div>
  )
}
