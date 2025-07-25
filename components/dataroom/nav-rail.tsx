"use client"

import Image from "next/image"
import { FolderKanban, MessageCircle, Settings, LifeBuoy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavRailProps {
  activeView: string
  setActiveView: (view: string) => void
}

export const NavRail = ({ activeView, setActiveView }: NavRailProps) => {
  const navItems = [
    { id: "dataroom", icon: FolderKanban, label: "Data Room" },
    { id: "chatbot", icon: MessageCircle, label: "Chatbot" },
  ]

  return (
    <aside className="flex h-screen w-16 flex-col items-center border-r bg-background py-4">
      <TooltipProvider>
        <div className="flex h-14 w-14 items-center justify-center rounded-lg">
          <Image src="/logo.png" alt="DilBloom Logo" width={40} height={40} />
        </div>
        <nav className="flex flex-1 flex-col items-center gap-2 py-4">
          {navItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-10 w-10 rounded-lg", activeView === item.id && "bg-primary/10 text-primary")}
                  onClick={() => setActiveView(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <div className="flex flex-col items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg">
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg">
                <LifeBuoy className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Support</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </aside>
  )
}
