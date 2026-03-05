"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Code2,
  FileText,
  Shield,
  CheckCircle,
  Clock,
  TrendingUp,
  LogOut,
  Upload,
  Play,
  Zap,
  Moon,
  Sun,
} from "lucide-react"

export default function Dashboard() {
  const [user] = useState({ name: "John Doe", email: "john@example.com" })
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [recentProjects] = useState([
    { id: 1, name: "E-commerce API", language: "JavaScript", status: "completed", issues: 3, fixed: 3 },
    { id: 2, name: "Data Pipeline", language: "Python", status: "in-progress", issues: 7, fixed: 4 },
    { id: 3, name: "Mobile App Backend", language: "TypeScript", status: "pending", issues: 12, fixed: 0 },
  ])

  const router = useRouter()

  useEffect(() => {
    const html = document.documentElement
    if (isDarkMode) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleLogout = () => {
    console.log("[v0] Logout clicked")
    // Placeholder for logout logic
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Dev Clarity</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
            <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues Fixed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">147</div>
              <p className="text-xs text-muted-foreground">+12 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Scans</CardTitle>
              <Shield className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+7 vulnerabilities found</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Code Quality</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">+5% improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code2 className="h-5 w-5" />
                  <span>Recent Projects</span>
                </CardTitle>
                <CardDescription>Your latest code analysis projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Code2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.language}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {project.fixed}/{project.issues} issues fixed
                          </p>
                          <Progress value={(project.fixed / project.issues) * 100} className="w-20 h-2" />
                        </div>
                        <Badge
                          variant={
                            project.status === "completed"
                              ? "default"
                              : project.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Code2 className="h-4 w-4 mr-2" />
                  Analyze Code
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => router.push("/editor")}
                >
                  <Code2 className="h-4 w-4 mr-2" />
                  Open Code Editor
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Scan
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Docs
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Play className="h-4 w-4 mr-2" />
                  Run Tests
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Fixed 3 security vulnerabilities</p>
                      <p className="text-xs text-muted-foreground">E-commerce API • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Generated unit tests</p>
                      <p className="text-xs text-muted-foreground">Data Pipeline • 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Code review completed</p>
                      <p className="text-xs text-muted-foreground">Mobile App Backend • 1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
