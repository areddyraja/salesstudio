"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("home")
  const [activeSubTab, setActiveSubTab] = useState("presentations")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedPresentationTags, setSelectedPresentationTags] = useState<string[]>([])

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleLogout = () => {
    // Here you would typically clear any authentication tokens or user data
    // For now, we'll just redirect to the login page
    router.push("/")
  }

  // Mock data for sales pitches
  const salesPitches = [
    { id: 1, summary: "Product A pitch", category: "Tech", customer: "Company X", status: "Active", score: 85, goodResponse: "Yes", tags: ["innovative", "cost-effective"], createdBy: "John Doe", createdDate: "2023-04-15", pitchText: "This is a sample pitch text for Product A..." },
    { id: 2, summary: "Service B proposal", category: "Services", customer: "Company Y", status: "Pending", score: 75, goodResponse: "Yes", tags: ["scalable", "efficient"], createdBy: "Jane Smith", createdDate: "2023-04-20", pitchText: "This is a sample pitch text for Service B..." },
    { id: 3, summary: "Product C demo", category: "Tech", customer: "Company Z", status: "Active", score: 90, goodResponse: "Yes", tags: ["innovative", "user-friendly"], createdBy: "Bob Johnson", createdDate: "2023-04-25", pitchText: "This is a sample pitch text for Product C..." },
    // Add more mock data as needed
  ]

  // Extract all unique tags from salesPitches
  const allTags = Array.from(new Set(salesPitches.flatMap(pitch => pitch.tags)))

  // Mock data for presentations
  const presentations = [
    { id: 1, summary: "Q2 Sales Strategy", createdBy: "Jane Doe", createdDate: "2023-05-01", status: "Draft", tags: ["sales", "strategy"], notes: "Needs review", comments: "Looking good so far" },
    { id: 2, summary: "Product Launch Plan", createdBy: "John Smith", createdDate: "2023-05-15", status: "Final", tags: ["product", "launch"], notes: "Approved by management", comments: "Great work!" },
    // Add more mock data as needed
  ]

  // Mock data for templates
  const templates = [
    { id: 1, summary: "Sales Pitch Template", createdBy: "Marketing Team", createdDate: "2023-04-01", status: "Active", tags: ["sales", "template"], notes: "Use for new clients", comments: "Update quarterly" },
    { id: 2, summary: "Product Demo Template", createdBy: "Product Team", createdDate: "2023-04-15", status: "Active", tags: ["product", "demo"], notes: "Include latest features", comments: "Well received by clients" },
    // Add more mock data as needed
  ]

  // Add mock data for recent activities
  const recentActivities = [
    { id: 1, user: "John", action: "created a sales pitch", target: "Agent.AI", date: "2023-05-20" },
    { id: 2, user: "David", action: "created a presentation", target: "TechCorp", date: "2023-05-19" },
    { id: 3, user: "Sarah", action: "updated a sales pitch", target: "InnovateTech", date: "2023-05-18" },
    { id: 4, user: "Emily", action: "finalized a presentation", target: "FutureSoft", date: "2023-05-17" },
    { id: 5, user: "Michael", action: "started a new pitch", target: "AI Solutions", date: "2023-05-16" },
  ]

  const filteredPitches = salesPitches.filter(pitch =>
    (pitch.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pitch.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pitch.customer.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedTags.length === 0 || selectedTags.every(tag => pitch.tags.includes(tag)))
  )

  const filteredPresentations = presentations.filter(presentation =>
    (presentation.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    presentation.createdBy.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedPresentationTags.length === 0 || selectedPresentationTags.every(tag => presentation.tags.includes(tag)))
  )

  const filteredTemplates = templates.filter(template =>
    (template.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.createdBy.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedPresentationTags.length === 0 || selectedPresentationTags.every(tag => template.tags.includes(tag)))
  )

  const handleTagClick = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    )
  }

  const allPresentationTags = Array.from(new Set([...presentations, ...templates].flatMap(item => item.tags)))

  const handlePresentationTagClick = (tag: string) => {
    setSelectedPresentationTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
              Logo
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              Dashboard
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              Profile
            </Link>
            <Link href="/settings" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              Settings
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="salespitches">Sales Pitches</TabsTrigger>
            <TabsTrigger value="presentations">Presentations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Sales Pitches
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{salesPitches.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Presentations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{presentations.length}</div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex space-x-4">
                    <Link href="/new-pitch">
                      <Button>New Sales Pitch</Button>
                    </Link>
                    <Link href={activeSubTab === "presentations" ? "/new-presentation" : "/new-template"}>
                      <Button>
                        {activeSubTab === "presentations" ? "New Presentation" : "New Template"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                <Card>
                  <CardContent className="p-0">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {recentActivities.map((activity) => (
                        <li key={activity.id} className="p-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.user} {activity.action} for {activity.target}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="salespitches">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Sales Pitches</h2>
                <Link href="/new-pitch">
                  <Button>New Pitch</Button>
                </Link>
              </div>
              <Input
                type="text"
                placeholder="Search pitches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Good Response</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Pitch Text</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPitches.map((pitch) => (
                    <TableRow key={pitch.id}>
                      <TableCell>{pitch.id}</TableCell>
                      <TableCell>{pitch.summary}</TableCell>
                      <TableCell>{pitch.category}</TableCell>
                      <TableCell>{pitch.customer}</TableCell>
                      <TableCell>{pitch.status}</TableCell>
                      <TableCell>{pitch.score}</TableCell>
                      <TableCell>{pitch.goodResponse}</TableCell>
                      <TableCell>{pitch.tags.join(", ")}</TableCell>
                      <TableCell>{pitch.createdBy}</TableCell>
                      <TableCell>{pitch.createdDate}</TableCell>
                      <TableCell>{pitch.pitchText.substring(0, 50)}...</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="presentations">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Presentations</h2>
                <Link href={activeSubTab === "presentations" ? "/new-presentation" : "/new-template"}>
                  <Button>
                    {activeSubTab === "presentations" ? "New Presentation" : "New Template"}
                  </Button>
                </Link>
              </div>
              <Input
                type="text"
                placeholder="Search presentations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {allPresentationTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedPresentationTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handlePresentationTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
                <TabsList>
                  <TabsTrigger value="presentations">Presentations</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <TabsContent value="presentations">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Summary</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Comments</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPresentations.map((presentation) => (
                        <TableRow key={presentation.id}>
                          <TableCell>{presentation.id}</TableCell>
                          <TableCell>{presentation.summary}</TableCell>
                          <TableCell>{presentation.createdBy}</TableCell>
                          <TableCell>{presentation.createdDate}</TableCell>
                          <TableCell>{presentation.status}</TableCell>
                          <TableCell>{presentation.tags.join(", ")}</TableCell>
                          <TableCell>{presentation.notes}</TableCell>
                          <TableCell>{presentation.comments}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="templates">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Summary</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Comments</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTemplates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell>{template.id}</TableCell>
                          <TableCell>{template.summary}</TableCell>
                          <TableCell>{template.createdBy}</TableCell>
                          <TableCell>{template.createdDate}</TableCell>
                          <TableCell>{template.status}</TableCell>
                          <TableCell>{template.tags.join(", ")}</TableCell>
                          <TableCell>{template.notes}</TableCell>
                          <TableCell>{template.comments}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <h2 className="text-2xl font-semibold mb-4">Settings Content</h2>
            <p>This is the settings tab content.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}