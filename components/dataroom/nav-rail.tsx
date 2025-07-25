"use client"

import { MessageCircle, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const NavRail = ({
  activeView,
  setActiveView,
}: {
  activeView: string
  setActiveView: (view: string) => void
}) => (
  <TooltipProvider>
    <nav className="flex h-screen w-14 flex-col items-center gap-4 border-r bg-gray-100/40 py-4 dark:bg-gray-800/40">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={activeView === "dataroom" ? "secondary" : "ghost"}
            size="icon"
            className="rounded-lg"
            onClick={() => setActiveView("dataroom")}
          >
            <Database className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Data Room</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={activeView === "chatbot" ? "secondary" : "ghost"}
            size="icon"
            className="rounded-lg"
            onClick={() => setActiveView("chatbot")}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Chatbot</TooltipContent>
      </Tooltip>
    </nav>
  </TooltipProvider>
)
