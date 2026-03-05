"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Bug,
  ChevronDown,
  ChevronRight,
  File,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  Lightbulb,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sun,
  Upload,
  X,
  XCircle,
  Zap
} from "lucide-react"

// TypeScript interfaces
interface FileItem {
  name: string
  type: "file" | "folder"
  language?: string
  size?: string
  modified?: string
  children?: FileItem[]
}

interface ErrorItem {
  id: number
  type: string
  category: string
  line: number
  column: number
  message: string
  severity: "error" | "warning" | "info"
  rule: string
  description: string
  fixSuggestion?: string
  impact: "high" | "medium" | "low"
  codeSnippet: string
}

interface SuggestionItem {
  id: number
  type: string
  category: string
  priority: "high" | "medium" | "low"
  title: string
  description: string
  confidence: number
  estimatedTime: string
  code: string
  explanation: string
  relatedLines?: number[]
  tags: string[]
}

export default function CodeEditor() {
  const [isDark, setIsDark] = useState(true)
  const [activeFile, setActiveFile] = useState("app.tsx")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [rightPanelTab, setRightPanelTab] = useState("errors")
  const [suggestionFilter, setSuggestionFilter] = useState("all")
  const [suggestionSort, setSuggestionSort] = useState("priority")
  const [appliedSuggestions, setAppliedSuggestions] = useState(new Set<number>())
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFolders, setExpandedFolders] = useState(new Set(["src", "components"]))
  const [openTabs, setOpenTabs] = useState(["app.tsx"])

  const [fileStructure] = useState<FileItem[]>([
    {
      name: "src",
      type: "folder",
      children: [
        { name: "app.tsx", type: "file", language: "typescript", size: "2.1 KB", modified: "2 min ago" },
        { name: "index.css", type: "file", language: "css", size: "1.2 KB", modified: "1 hour ago" },
        { name: "main.tsx", type: "file", language: "typescript", size: "0.8 KB", modified: "3 hours ago" },
      ],
    },
    {
      name: "components",
      type: "folder",
      children: [
        {
          name: "ui",
          type: "folder",
          children: [
            { name: "button.tsx", type: "file", language: "typescript", size: "3.2 KB", modified: "1 day ago" },
            { name: "card.tsx", type: "file", language: "typescript", size: "2.8 KB", modified: "1 day ago" },
            { name: "input.tsx", type: "file", language: "typescript", size: "2.1 KB", modified: "2 days ago" },
          ],
        },
        { name: "Header.tsx", type: "file", language: "typescript", size: "1.9 KB", modified: "5 hours ago" },
        { name: "Footer.tsx", type: "file", language: "typescript", size: "1.1 KB", modified: "1 day ago" },
      ],
    },
    {
      name: "utils",
      type: "folder",
      children: [
        { name: "helpers.ts", type: "file", language: "typescript", size: "4.2 KB", modified: "3 days ago" },
        { name: "constants.ts", type: "file", language: "typescript", size: "0.9 KB", modified: "1 week ago" },
      ],
    },
    { name: "package.json", type: "file", language: "json", size: "1.8 KB", modified: "1 week ago" },
    { name: "tsconfig.json", type: "file", language: "json", size: "0.7 KB", modified: "2 weeks ago" },
    { name: "README.md", type: "file", language: "markdown", size: "2.3 KB", modified: "1 week ago" },
  ])

  // Sample code content
  const [code, setCode] = useState(`import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Missing dependency in useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="app">
      <h1>Welcome to Dev Clarity</h1>
      <Button onClick={handleClick}>
        Count: {count}
      </Button>
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;`)

  // Sample errors data
  const errors: ErrorItem[] = [
    {
      id: 1,
      type: "warning",
      category: "React Hooks",
      line: 8,
      column: 5,
      message: "React Hook useEffect has a missing dependency: 'fetchUsers'",
      severity: "warning",
      rule: "react-hooks/exhaustive-deps",
      description: "This hook is missing dependencies that could cause stale closures or infinite loops.",
      fixSuggestion: "Add 'fetchUsers' to the dependency array or move it inside useEffect",
      impact: "medium",
      codeSnippet: "useEffect(() => {\n    fetchUsers();\n  }, []);",
    },
    {
      id: 2,
      type: "error",
      category: "Error Handling",
      line: 15,
      column: 25,
      message: "Async function should handle potential errors",
      severity: "error",
      rule: "no-unhandled-promise",
      description: "Network requests can fail and should be wrapped in try-catch blocks to prevent unhandled promise rejections.",
      fixSuggestion: "Wrap fetch call in try-catch block",
      impact: "high",
      codeSnippet: "const response = await fetch('/api/users');",
    },
  ]

  const errorStats = {
    total: errors.length,
    critical: errors.filter((e) => e.severity === "error").length,
    warnings: errors.filter((e) => e.severity === "warning").length,
    info: errors.filter((e) => e.severity === "info").length,
    categories: {
      "React Hooks": errors.filter((e) => e.category === "React Hooks").length,
      "Error Handling": errors.filter((e) => e.category === "Error Handling").length,
    },
  }

  // Sample suggestions data
  const suggestions: SuggestionItem[] = [
    {
      id: 1,
      type: "optimization",
      category: "Performance",
      priority: "high",
      title: "Add error handling to async function",
      description: "Wrap the fetch call in a try-catch block to handle potential network errors and improve user experience",
      confidence: 95,
      estimatedTime: "2 min",
      code: `try {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  const data = await response.json();
  setUsers(data);
} catch (error) {
  console.error('Failed to fetch users:', error);
  setError('Failed to load users. Please try again.');
}`,
      explanation: "This implementation adds proper error handling with HTTP status checking and user feedback.",
      relatedLines: [15, 16, 17],
      tags: ["error-handling", "async", "user-experience"],
    },
  ]

  const filteredSuggestions = suggestions
    .filter((suggestion) => {
      if (suggestionFilter === "all") return true
      return suggestion.category.toLowerCase() === suggestionFilter.toLowerCase()
    })
    .sort((a, b) => {
      if (suggestionSort === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      if (suggestionSort === "confidence") {
        return b.confidence - a.confidence
      }
      if (suggestionSort === "time") {
        return parseInt(a.estimatedTime) - parseInt(b.estimatedTime)
      }
      return 0
    })

  const handleApplySuggestion = (suggestionId: number) => {
    setAppliedSuggestions(prev => new Set([...prev, suggestionId]))
    console.log(`Applied suggestion ${suggestionId}`)
  }

  // Helper functions
  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(folderName)) {
        newSet.delete(folderName)
      } else {
        newSet.add(folderName)
      }
      return newSet
    })
  }

  const openFile = (fileName: string) => {
    setActiveFile(fileName)
    if (!openTabs.includes(fileName)) {
      setOpenTabs(prev => [...prev, fileName])
    }
  }

  const closeTab = (fileName: string) => {
    setOpenTabs(prev => {
      const newTabs = prev.filter(tab => tab !== fileName)
      if (fileName === activeFile && newTabs.length > 0) {
        setActiveFile(newTabs[newTabs.length - 1])
      }
      return newTabs
    })
  }

  const getFileIcon = (language?: string) => {
    switch (language) {
      case "typescript":
        return <FileText className="w-4 h-4 text-blue-500" />
      case "css":
        return <FileText className="w-4 h-4 text-green-500" />
      case "json":
        return <FileText className="w-4 h-4 text-yellow-500" />
      case "markdown":
        return <FileText className="w-4 h-4 text-purple-500" />
      default:
        return <File className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getErrorIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <XCircle className="w-4 h-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-chart-4" />
      case "info":
        return <Lightbulb className="w-4 h-4 text-chart-2" />
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />
    }
  }

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Header */}
      <header className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-chart-4"></div>
            <div className="w-3 h-3 rounded-full bg-chart-3"></div>
          </div>
          <span className="text-sm font-medium">Dev Clarity Editor</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <GitBranch className="w-4 h-4 mr-2" />
            main
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className={`${sidebarCollapsed ? "w-12" : "w-64"} bg-sidebar border-r border-sidebar-border transition-all duration-200 flex flex-col`}>
          <div className="p-3 flex-1">
            <div className="flex items-center justify-between mb-4">
              {!sidebarCollapsed && <span className="text-sm font-medium text-sidebar-foreground">Explorer</span>}
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                <FolderOpen className="w-4 h-4" />
              </Button>
            </div>

            {!sidebarCollapsed && (
              <>
                <div className="relative mb-3">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 h-7 text-xs bg-sidebar-accent/50"
                  />
                </div>

                <ScrollArea className="flex-1">
                  <div className="space-y-1">
                    {fileStructure.map((item) => (
                      <div key={item.name}>
                        {item.type === "folder" ? (
                          <div>
                            <div
                              className="flex items-center gap-2 p-1 rounded hover:bg-sidebar-accent cursor-pointer"
                              onClick={() => toggleFolder(item.name)}
                            >
                              {expandedFolders.has(item.name) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                              <Folder className="w-4 h-4 text-blue-400" />
                              <span className="text-sm">{item.name}</span>
                            </div>
                            {expandedFolders.has(item.name) && item.children && (
                              <div className="ml-4">
                                {item.children.map((child) => (
                                  <div
                                    key={child.name}
                                    className={`flex items-center gap-2 p-1 rounded hover:bg-sidebar-accent cursor-pointer ${
                                      activeFile === child.name ? "bg-sidebar-accent" : ""
                                    }`}
                                    onClick={() => openFile(child.name)}
                                  >
                                    {getFileIcon(child.language)}
                                    <span className="text-sm">{child.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div
                            className={`flex items-center gap-2 p-1 rounded hover:bg-sidebar-accent cursor-pointer ${
                              activeFile === item.name ? "bg-sidebar-accent" : ""
                            }`}
                            onClick={() => openFile(item.name)}
                          >
                            {getFileIcon(item.language)}
                            <span className="text-sm">{item.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* File Tabs */}
          <div className="h-10 bg-card border-b border-border flex items-center px-4">
            <div className="flex items-center gap-1">
              {openTabs.map((tab) => (
                <div
                  key={tab}
                  className={`flex items-center gap-2 px-3 py-1 rounded-t cursor-pointer group ${
                    activeFile === tab ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => setActiveFile(tab)}
                >
                  {getFileIcon("typescript")}
                  <span className="text-sm">{tab}</span>
                  {openTabs.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        closeTab(tab)
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex">
            <div className="flex-1 relative">
              <div className="absolute inset-0 p-4">
                <div className="h-full bg-card rounded border border-border">
                  <div className="flex">
                    <div className="w-12 bg-muted p-4 text-right text-sm text-muted-foreground font-mono">
                      {code.split("\n").map((_, i) => (
                        <div key={i} className="leading-6">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 p-4">
                      <pre className="text-sm font-mono leading-6 text-card-foreground whitespace-pre-wrap">{code}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-96 bg-card border-l border-border flex flex-col">
              <div className="h-10 border-b border-border flex">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 text-sm ${
                    rightPanelTab === "errors" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => setRightPanelTab("errors")}
                >
                  <Bug className="w-4 h-4" />
                  Analysis
                  <Badge variant="destructive" className="ml-1">
                    {errorStats.total}
                  </Badge>
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 text-sm ${
                    rightPanelTab === "suggestions" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => setRightPanelTab("suggestions")}
                >
                  <Zap className="w-4 h-4" />
                  AI Suggestions
                  <Badge variant="secondary" className="ml-1">
                    {filteredSuggestions.length}
                  </Badge>
                </button>
              </div>

              <ScrollArea className="flex-1 p-4">
                {rightPanelTab === "errors" && (
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h3 className="font-medium text-card-foreground mb-3">Analysis Overview</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-destructive">{errorStats.critical}</div>
                          <div className="text-xs text-muted-foreground">Critical</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-chart-4">{errorStats.warnings}</div>
                          <div className="text-xs text-muted-foreground">Warnings</div>
                        </div>
                      </div>
                    </Card>

                    <div className="space-y-3">
                      {errors.map((error) => (
                        <Card key={error.id} className="p-3">
                          <div className="flex items-start gap-2">
                            {getErrorIcon(error.severity)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  variant={
                                    error.severity === "error"
                                      ? "destructive"
                                      : error.severity === "warning"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {error.category}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Ln {error.line}:{error.column}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium text-card-foreground mb-1">{error.message}</p>
                              <p className="text-xs text-muted-foreground mb-2">{error.description}</p>
                              <div className="bg-muted p-2 rounded text-xs font-mono mb-2">
                                <pre className="whitespace-pre-wrap">{error.codeSnippet}</pre>
                              </div>
                              <Button size="sm" variant="outline" className="text-xs">
                                Quick Fix
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {rightPanelTab === "suggestions" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-card-foreground">AI Suggestions</h3>
                      <Badge variant="secondary" className="text-xs">
                        {filteredSuggestions.length} suggestions
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {filteredSuggestions.map((suggestion) => (
                        <Card key={suggestion.id} className="p-3">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  {suggestion.category}
                                </Badge>
                                <Badge
                                  variant={
                                    suggestion.priority === "high"
                                      ? "destructive"
                                      : suggestion.priority === "medium"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {suggestion.priority} priority
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {suggestion.confidence}% confidence
                                </span>
                              </div>

                              <h4 className="font-medium text-sm text-card-foreground mb-1">{suggestion.title}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>

                              <div className="bg-muted p-2 rounded text-xs font-mono mb-2">
                                <pre className="whitespace-pre-wrap text-card-foreground">{suggestion.code}</pre>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleApplySuggestion(suggestion.id)}
                                  disabled={appliedSuggestions.has(suggestion.id)}
                                >
                                  {appliedSuggestions.has(suggestion.id) ? "Applied" : "Apply Suggestion"}
                                </Button>
                                <Button size="sm" variant="outline">
                                  Preview
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-6 bg-muted border-t border-border flex items-center justify-between px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>TypeScript React</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span>{activeFile}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>{openTabs.length} files open</span>
          <div className="flex items-center gap-1">
            <XCircle className="w-3 h-3 text-destructive" />
            <span>{errorStats.critical}</span>
            <AlertTriangle className="w-3 h-3 text-chart-4 ml-2" />
            <span>{errorStats.warnings}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
