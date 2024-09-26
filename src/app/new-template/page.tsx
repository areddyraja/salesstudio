"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function NewTemplatePage() {
  const router = useRouter()
  const [templateData, setTemplateData] = useState({
    summary: "",
    copyFrom: "",
    status: "Draft",
    tags: "",
  })
  const [slides, setSlides] = useState([{ id: 1, title: "Slide 1", content: "" }])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [templateChatMessages, setTemplateChatMessages] = useState<Array<{ role: string; content: string }>>([])
  const [templateUserInput, setTemplateUserInput] = useState("")
  const [isTemplateAgentOpen, setIsTemplateAgentOpen] = useState(false)

  // Mock data for existing templates
  const existingTemplates = [
    { id: "1", name: "Sales Pitch Template" },
    { id: "2", name: "Product Demo Template" },
    { id: "3", name: "Quarterly Review Template" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTemplateData({ ...templateData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setTemplateData({ ...templateData, [name]: value })
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

  const handleDeleteSlide = () => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_, index) => index !== currentSlide)
      setSlides(newSlides)
      setCurrentSlide(Math.min(currentSlide, newSlides.length - 1))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting template:", { ...templateData, slides })
    router.push("/dashboard?tab=presentations")
  }

  const handleCancel = () => {
    router.push("/dashboard?tab=presentations")
  }

  const handleTemplateChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!templateUserInput.trim()) return

    const newMessage = { role: "user", content: templateUserInput }
    setTemplateChatMessages([...templateChatMessages, newMessage])
    setTemplateUserInput("")

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse = { role: "assistant", content: "This is a simulated Template Agent response." }
      setTemplateChatMessages(prevMessages => [...prevMessages, aiResponse])
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
        <h1 className="text-3xl font-bold mb-8">Create New Template</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="summary"
            placeholder="Template Summary"
            value={templateData.summary}
            onChange={handleInputChange}
            required
          />
          <Select name="copyFrom" onValueChange={(value) => handleSelectChange("copyFrom", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Copy from Template" />
            </SelectTrigger>
            <SelectContent>
              {existingTemplates.map((template) => (
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
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Input
            name="tags"
            placeholder="Tags (comma-separated)"
            value={templateData.tags}
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
                <Button type="button" onClick={handleDeleteSlide} className="ml-2" disabled={slides.length === 1}>
                  Delete Slide
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
            <Button type="submit">Create Template</Button>
          </div>
        </form>
      </div>
      
      <div className="w-1/3 ml-4 space-y-4">
        <Collapsible open={isTemplateAgentOpen} onOpenChange={setIsTemplateAgentOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              {isTemplateAgentOpen ? "Hide" : "Show"} Template Agent
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4">Template Agent</h2>
              <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4">
                {templateChatMessages.map((message, index) => (
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
              <form onSubmit={handleTemplateChatSubmit} className="flex">
                <Input
                  type="text"
                  value={templateUserInput}
                  onChange={(e) => setTemplateUserInput(e.target.value)}
                  placeholder="Ask the Template Agent..."
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