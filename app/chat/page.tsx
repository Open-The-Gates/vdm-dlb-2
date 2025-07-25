"use client";

import * as React from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { NavRail } from "@/components/dataroom/nav-rail";

export default function ChatPage() {
  const [activeView, setActiveView] = React.useState("chatbot");
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleViewChange = (view: string) => {
    if (view === "dataroom") {
      window.location.href = "/";
    } else {
      setActiveView(view);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <NavRail activeView={activeView} setActiveView={handleViewChange} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b bg-white dark:bg-gray-800 px-6 py-4">
          <h1 className="text-xl font-semibold">Chat Assistant</h1>
          <p className="text-sm text-gray-500">
            Ask me anything about your data
          </p>
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-6 py-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Bot className="mx-auto h-12 w-12 text-gray-400" />
                    <h2 className="mt-2 text-lg font-medium">
                      Start a conversation
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Ask me anything about your data or files
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/bot-avatar.png" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <Card
                      className={cn(
                        "max-w-[80%]",
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white dark:bg-gray-800"
                      )}
                    >
                      <CardContent className="p-3">
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </CardContent>
                    </Card>

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/user-avatar.png" />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        <div className="border-t bg-white dark:bg-gray-800 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
