"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Code, Shield, TestTube, FileText, Upload, Users, Zap, Sun, Moon } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)

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

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Multi-Language Support",
      description: "Analyze code across Python, JavaScript, C++, and more with comprehensive language support.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security Scanner",
      description:
        "Dedicated security analysis to identify vulnerabilities and ensure your code meets security standards.",
    },
    {
      icon: <TestTube className="h-8 w-8" />,
      title: "Automated Testing",
      description: "Generate unit tests automatically for your corrected code, saving time and ensuring quality.",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Documentation",
      description: "AI-powered documentation generation with comments and docstrings for better code maintainability.",
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Direct File Upload",
      description: "Upload multiple code files directly for seamless analysis and review.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Project History",
      description: "Cloud-based storage for all your analysis sessions with secure user authentication.",
    },
  ]

  const coreFeatures = [
    "Comprehensive Code Review",
    "Intelligent Code Fixing",
    "Interactive Diff Viewer",
    "Contextual AI Explanations",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Dev Clarity</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-9 w-9 p-0">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            AI-Powered Code Analysis
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Transform Your Code with AI-Powered Precision
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Automated analysis, intelligent fixing, and comprehensive testing for every programming language. Let AI
            handle the tedious work while you focus on building great software.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Started for Free
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Code Analysis & Repair</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our foundational features deliver comprehensive code analysis and intelligent repairs across multiple
              programming languages.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold">{feature}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Generative Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful AI capabilities that solve major developer pain points and automate the most tedious coding
              tasks.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="text-primary mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Simple, powerful, and efficient code analysis in just a few steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Upload Your Code</h3>
              <p className="text-muted-foreground">
                Drag and drop your files or paste code directly into our secure platform.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI performs comprehensive analysis, identifying bugs, security issues, and optimization
                opportunities.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Get Results</h3>
              <p className="text-muted-foreground">
                Review detailed explanations, apply fixes, and download improved code with generated tests and
                documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Code?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of developers who trust Dev Clarity to improve their code quality and productivity.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
                  <Code className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold">Dev Clarity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered code analysis and repair for modern development teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Dev Clarity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
