"use client"

import * as React from "react"
import { Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useChat } from "ai/react"
import { cn } from "@/lib/utils"
import { NavRail } from "@/components/dataroom/nav-rail"

export default function ChatPage() {
  const [activeView, setActiveView] = React.useState("chatbot")
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleViewChange = (view: string) => {
    if (view === "dataroom") {
      window.location.href = "/"
    } else {
      setActiveView(view)
    }
  }

  return (
    <div className="flex h-screen w-full bg-gray-100/50 dark:bg-black">
      <NavRail activeView={activeView} setActiveView={handleViewChange} />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-950">
          <div>
            <h1 className="text-lg font-semibold">Chat Assistant</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Engage with your data through conversation.</p>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="mx-auto max-w-4xl space-y-8 p-6">
              {messages.length === 0 ? (
                <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
                  <div className="rounded-full border bg-white p-4 shadow-sm dark:bg-gray-900">
                    <Bot className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold">Welcome to the Chat Assistant</h2>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    You can start a conversation by typing a message below.
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex items-start gap-4", message.role === "user" && "justify-end")}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src="/bot-avatar.png" alt="Assistant" />
                        <AvatarFallback>
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] rounded-lg p-3 text-sm shadow-sm",
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-white dark:bg-gray-900",
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src="/user-avatar.png" alt="User" />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </main>

        <footer className="border-t bg-white p-4 dark:bg-gray-950">
          <div className="mx-auto max-w-4xl">
            <form onSubmit={handleSubmit} className="relative">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about your financial reports, legal documents, or anything else..."
                className="h-12 w-full rounded-full bg-gray-100 pr-16 dark:bg-gray-800"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              You can ask questions like: "Summarize the Q4 2023 report."
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
