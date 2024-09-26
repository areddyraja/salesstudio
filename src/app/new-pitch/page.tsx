"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function NewPitchPage() {
  const router = useRouter()
  const [pitchData, setPitchData] = useState({
    summary: "",
    category: "",
    customer: "",
    status: "Active",
    score: "",
    goodResponse: "Yes",
    tags: "",
    pitchText: "",
    researchText: "", // Add this line for the new Research area
  })
  const [pitchChatMessages, setPitchChatMessages] = useState<Array<{ role: string; content: string }>>([])
  const [researchChatMessages, setResearchChatMessages] = useState<Array<{ role: string; content: string }>>([])
  const [pitchUserInput, setPitchUserInput] = useState("")
  const [researchUserInput, setResearchUserInput] = useState("")
  const [isOtherFieldsOpen, setIsOtherFieldsOpen] = useState(false)
  const [isPitchAgentOpen, setIsPitchAgentOpen] = useState(false)
  const [isResearchAgentOpen, setIsResearchAgentOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPitchData({ ...pitchData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setPitchData({ ...pitchData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting pitch:", pitchData)
    router.push("/dashboard?tab=salespitches")
  }

  const handleCancel = () => {
    router.push("/dashboard?tab=salespitches")
  }

  const handlePitchChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pitchUserInput.trim()) return

    const newMessage = { role: "user", content: pitchUserInput }
    setPitchChatMessages([...pitchChatMessages, newMessage])
    setPitchUserInput("")

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse = { role: "assistant", content: "This is a simulated Pitch Agent response." }
      setPitchChatMessages(prevMessages => [...prevMessages, aiResponse])
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
      const aiResponse = { role: "assistant", content: "This is a simulated Research Agent response with information about the company and its products." }
      setResearchChatMessages(prevMessages => [...prevMessages, aiResponse])
    }, 1000)
  }

  const copyToPitchText = (content: string) => {
    setPitchData(prevData => ({
      ...prevData,
      pitchText: prevData.pitchText + (prevData.pitchText ? "\n\n" : "") + content
    }))
  }

  const copyToResearchText = (content: string) => {
    setPitchData(prevData => ({
      ...prevData,
      researchText: prevData.researchText + (prevData.researchText ? "\n\n" : "") + content
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="flex-grow mr-4">
        <h1 className="text-3xl font-bold mb-8">Create New Pitch</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Collapsible open={isOtherFieldsOpen} onOpenChange={setIsOtherFieldsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="mb-4">
                {isOtherFieldsOpen ? "Hide" : "Show"} Other Fields
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4">
              <Input
                name="summary"
                placeholder="Summary"
                value={pitchData.summary}
                onChange={handleInputChange}
                required
              />
              <Input
                name="category"
                placeholder="Category"
                value={pitchData.category}
                onChange={handleInputChange}
                required
              />
              <Input
                name="customer"
                placeholder="Customer"
                value={pitchData.customer}
                onChange={handleInputChange}
                required
              />
              <Select name="status" onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Input
                name="score"
                type="number"
                placeholder="Score"
                value={pitchData.score}
                onChange={handleInputChange}
                required
              />
              <Select name="goodResponse" onValueChange={(value) => handleSelectChange("goodResponse", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Good Response" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              <Input
                name="tags"
                placeholder="Tags (comma-separated)"
                value={pitchData.tags}
                onChange={handleInputChange}
              />
            </CollapsibleContent>
          </Collapsible>
          
          <Textarea
            name="pitchText"
            placeholder="Pitch Text"
            value={pitchData.pitchText}
            onChange={handleInputChange}
            required
            className="h-64"
          />
          
          <Textarea
            name="researchText"
            placeholder="Research Area"
            value={pitchData.researchText}
            onChange={handleInputChange}
            className="h-64"
          />
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Pitch</Button>
          </div>
        </form>
      </div>
      
      <div className="w-1/3 ml-4 space-y-4">
        <Collapsible open={isPitchAgentOpen} onOpenChange={setIsPitchAgentOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              {isPitchAgentOpen ? "Hide" : "Show"} Pitch Agent
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4">Chat with Pitch Agent</h2>
              <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4">
                {pitchChatMessages.map((message, index) => (
                  <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {message.content}
                    </span>
                    {message.role === 'assistant' && (
                      <div className="mt-1">
                        <Button variant="link" onClick={() => copyToPitchText(message.content)} className="mr-2">
                          Copy to Pitch
                        </Button>
                        <Button variant="link" onClick={() => copyToResearchText(message.content)}>
                          Copy to Research
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <form onSubmit={handlePitchChatSubmit} className="flex">
                <Input
                  type="text"
                  value={pitchUserInput}
                  onChange={(e) => setPitchUserInput(e.target.value)}
                  placeholder="Ask the Pitch Agent..."
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
              <h2 className="text-2xl font-semibold mb-4">Chat with Research Agent</h2>
              <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4">
                {researchChatMessages.map((message, index) => (
                  <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {message.content}
                    </span>
                    {message.role === 'assistant' && (
                      <div className="mt-1">
                        <Button variant="link" onClick={() => copyToPitchText(message.content)} className="mr-2">
                          Copy to Pitch
                        </Button>
                        <Button variant="link" onClick={() => copyToResearchText(message.content)}>
                          Copy to Research
                        </Button>
                      </div>
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