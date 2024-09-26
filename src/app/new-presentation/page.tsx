"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function NewPresentationPage() {
  const router = useRouter()
  const [presentationData, setPresentationData] = useState({
    summary: "",
    template: "",
    status: "Draft",
    tags: "",
  })
  const [slides, setSlides] = useState([{ id: 1, title: "Slide 1", content: "" }])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [presentationChatMessages, setPresentationChatMessages] = useState<Array<{ role: string; content: string }>>([])
  const [researchChatMessages, setResearchChatMessages] = useState<Array<{ role: string; content: string }>>([])
  const [presentationUserInput, setPresentationUserInput] = useState("")
  const [researchUserInput, setResearchUserInput] = useState("")
  const [isPresentationAgentOpen, setIsPresentationAgentOpen] = useState(false)
  const [isResearchAgentOpen, setIsResearchAgentOpen] = useState(false)

  // Mock data for templates
  const templates = [
    { id: "1", name: "Sales Pitch Template" },
    { id: "2", name: "Product Demo Template" },
    { id: "3", name: "Quarterly Review Template" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPresentationData({ ...presentationData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setPresentationData({ ...presentationData, [name]: value })
  }

  const handleSlideChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedSlides = [...slides]
    updatedSlides[currentSlide].content = e.target.value
    setSlides(updatedSlides)
  }

  const handleAddSlide = () => {
    setSlides([...slides, { id: slides.length + 1, title: `Slide ${slides.length + 1}`, content: "" }])
    setCurrentSlide(slides.length)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting presentation:", { ...presentationData, slides })
    router.push("/dashboard?tab=presentations")
  }

  const handleCancel = () => {
    router.push("/dashboard?tab=presentations")
  }

  const handlePresentationChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!presentationUserInput.trim()) return

    const newMessage = { role: "user", content: presentationUserInput }
    setPresentationChatMessages([...presentationChatMessages, newMessage])
    setPresentationUserInput("")

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse = { role: "assistant", content: "This is a simulated Presentation Agent response." }
      setPresentationChatMessages(prevMessages => [...prevMessages, aiResponse])
    }, 1000)
  }

  const handleResearchChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!researchUserInput.trim()) return

    const newMessage = { role: "user", content: researchUserInput }
    setResearchChatMessages([...researchChatMessages, newMessage])
    setResearchUserInput("")

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse = { role: "assistant", content: "This is a simulated Research Agent response." }
      setResearchChatMessages(prevMessages => [...prevMessages, aiResponse])
    }, 1000)
  }

  const copyToSlide = (content: string) => {
    const updatedSlides = [...slides]
    updatedSlides[currentSlide].content += (updatedSlides[currentSlide].content ? "\n\n" : "") + content
    setSlides(updatedSlides)
  }

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="flex-grow mr-4">
        <h1 className="text-3xl font-bold mb-8">Create New Presentation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="summary"
            placeholder="Presentation Summary"
            value={presentationData.summary}
            onChange={handleInputChange}
            required
          />
          <Select name="template" onValueChange={(value) => handleSelectChange("template", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select Template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select name="status" onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="In Review">In Review</SelectItem>
              <SelectItem value="Final">Final</SelectItem>
            </SelectContent>
          </Select>
          <Input
            name="tags"
            placeholder="Tags (comma-separated)"
            value={presentationData.tags}
            onChange={handleInputChange}
          />
          
          <div className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Slides</h2>
              <div>
                <Button type="button" onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} disabled={currentSlide === 0}>
                  Previous
                </Button>
                <span className="mx-2">
                  Slide {currentSlide + 1} of {slides.length}
                </span>
                <Button type="button" onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))} disabled={currentSlide === slides.length - 1}>
                  Next
                </Button>
                <Button type="button" onClick={handleAddSlide} className="ml-2">
                  Add Slide
                </Button>
              </div>
            </div>
            <Textarea
              placeholder={`Content for ${slides[currentSlide].title}`}
              value={slides[currentSlide].content}
              onChange={handleSlideChange}
              className="h-64"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Presentation</Button>
          </div>
        </form>
      </div>
      
      <div className="w-1/3 ml-4 space-y-4">
        <Collapsible open={isPresentationAgentOpen} onOpenChange={setIsPresentationAgentOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              {isPresentationAgentOpen ? "Hide" : "Show"} Presentation Agent
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4">Presentation Agent</h2>
              <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4">
                {presentationChatMessages.map((message, index) => (
                  <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {message.content}
                    </span>
                    {message.role === 'assistant' && (
                      <Button variant="link" onClick={() => copyToSlide(message.content)} className="ml-2">
                        Copy to Current Slide
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <form onSubmit={handlePresentationChatSubmit} className="flex">
                <Input
                  type="text"
                  value={presentationUserInput}
                  onChange={(e) => setPresentationUserInput(e.target.value)}
                  placeholder="Ask the Presentation Agent..."
                  className="flex-grow mr-2"
                />
                <Button type="submit">Send</Button>
              </form>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isResearchAgentOpen} onOpenChange={setIsResearchAgentOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              {isResearchAgentOpen ? "Hide" : "Show"} Research Agent
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4">Research Agent</h2>
              <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4">
                {researchChatMessages.map((message, index) => (
                  <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {message.content}
                    </span>
                    {message.role === 'assistant' && (
                      <Button variant="link" onClick={() => copyToSlide(message.content)} className="ml-2">
                        Copy to Current Slide
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <form onSubmit={handleResearchChatSubmit} className="flex">
                <Input
                  type="text"
                  value={researchUserInput}
                  onChange={(e) => setResearchUserInput(e.target.value)}
                  placeholder="Ask the Research Agent..."
                  className="flex-grow mr-2"
                />
                <Button type="submit">Send</Button>
              </form>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}