"use client"

import * as React from "react"
import { Home, ChevronRight, Search, Filter, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { File as FileType } from "@/lib/data"

export const Header = ({
  onUploadClick,
  onNewFolderClick,
  onSearch,
  breadcrumbPath,
}: {
  onUploadClick: () => void
  onNewFolderClick: () => void
  onSearch: (term: string) => void
  breadcrumbPath: FileType[]
}) => (
  <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 dark:bg-gray-950">
    <div className="flex items-center gap-2 text-sm">
      <Home className="h-4 w-4 text-gray-500" />
      {breadcrumbPath.map((folder, index) => (
        <React.Fragment key={folder.id}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className={cn(index === breadcrumbPath.length - 1 && "font-semibold text-gray-800 dark:text-gray-200")}>
            {folder.name}
          </span>
        </React.Fragment>
      ))}
    </div>
    <div className="relative mx-auto w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      <Input
        type="search"
        placeholder="Search files and folders..."
        className="w-full rounded-lg bg-gray-100 pl-9 dark:bg-gray-800"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
    <div className="flex items-center gap-2">
      <Button onClick={onUploadClick} variant="default">
        <UploadCloud className="mr-2 h-4 w-4" /> Upload
      </Button>
      <Button variant="outline" onClick={onNewFolderClick}>
        New Folder
      </Button>
    </div>
  </header>
)
