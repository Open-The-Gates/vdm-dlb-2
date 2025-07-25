"use client"

import * as React from "react"
import { Home, ChevronRight, ChevronDown, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { File as FileType } from "@/lib/data"

export const FolderSidebar = ({
  allFiles,
  currentFolderId,
  onFolderSelect,
}: {
  allFiles: FileType[]
  currentFolderId: string | null
  onFolderSelect: (id: string | null) => void
}) => {
  const [openFolders, setOpenFolders] = React.useState<Set<string>>(new Set(["1"]))

  const toggleFolder = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setOpenFolders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const renderFoldersRecursive = (parentId: string | null) => {
    const foldersInLevel = allFiles.filter((file) => file.parentId === parentId && file.type === "folder")

    return (
      <div className={cn(parentId && "pl-4")}>
        {foldersInLevel.map((folder) => {
          const hasSubfolders = allFiles.some((file) => file.parentId === folder.id && file.type === "folder")
          return (
            <div key={folder.id}>
              <div
                onClick={() => onFolderSelect(folder.id)}
                className={cn(
                  "flex cursor-pointer items-center gap-1 rounded-md py-1.5 pr-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800",
                  currentFolderId === folder.id && "bg-gray-200 dark:bg-gray-700",
                )}
              >
                {hasSubfolders ? (
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => toggleFolder(e, folder.id)}>
                    {openFolders.has(folder.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                ) : (
                  <div className="h-6 w-6" /> // Placeholder for alignment
                )}
                <span className="flex-1 truncate">{folder.name}</span>
              </div>
              {hasSubfolders && openFolders.has(folder.id) && renderFoldersRecursive(folder.id)}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <aside className="hidden w-64 flex-col border-r bg-white p-4 dark:bg-gray-950 md:flex">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Data Room</h2>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex-1 space-y-1">
        <div
          onClick={() => onFolderSelect(null)}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800",
            currentFolderId === null && "bg-gray-200 dark:bg-gray-700",
          )}
        >
          <Home className="ml-2 h-4 w-4" />
          <span>Home</span>
        </div>
        {renderFoldersRecursive(null)}
      </nav>
    </aside>
  )
}
