"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Code, ArrowLeft, Sun, Moon, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    document.documentElement.classList.toggle("dark", newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignUp = async () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long")
      return
    }

    console.log("Sign up attempted with:", formData)
    // Firebase authentication logic will go here
    console.log("[v0] Sign up successful, redirecting to dashboard")
    router.push("/dashboard")
  }

  const handleGoogleSignUp = async () => {
    console.log("Google sign-up attempted")
    // Firebase Google authentication logic will go here
    console.log("[v0] Google sign-up successful, redirecting to dashboard")
    router.push("/dashboard")
  }

  const codeLines = [
    "import React from 'react'",
    "const createUser = async (userData) => {",
    "  const user = await db.users.create(userData)",
    "  return { success: true, user }",
    "}",
    "export default function SignUp() {",
    "  const [form, setForm] = useState({})",
    "  const handleSubmit = (e) => {",
    "    e.preventDefault()",
    "    createAccount(form)",
    "  }",
    "  return <form onSubmit={handleSubmit}>",
    "}",
    "const validateEmail = (email) => {",
    "  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)",
    "}",
    "npm run build",
    "git add . && git commit -m 'Add signup'",
    "docker-compose up -d",
    "const hashPassword = bcrypt.hash(password, 10)",
    "INSERT INTO users (name, email) VALUES (?, ?)",
    "CREATE INDEX idx_users_email ON users(email)",
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <Link
        href="/login"
        className="absolute top-4 left-4 z-30 flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back to Login</span>
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
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join Dev Clarity and start analyzing your code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button onClick={handleSignUp} className="w-full" size="lg">
              Create Account
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

          <Button onClick={handleGoogleSignUp} variant="outline" className="w-full bg-transparent" size="lg">
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
            Sign up with Google
          </Button>

          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground hover:underline font-medium">
                Sign In
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
          0%, 20% { 
            opacity: 0; 
          }
          50% { 
            opacity: ${isDarkMode ? "0.7" : "0.9"}; 
          }
          80%, 100% { 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  )
}
