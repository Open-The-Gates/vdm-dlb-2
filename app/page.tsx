"use client"

import * as React from "react"
import { LayoutGrid, MessageCircle, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { mockFiles, type File as FileType } from "@/lib/data"
import { uploadFile } from "@/lib/actions"
import { useHotkeys } from "@/hooks/use-hotkeys"

import { NavRail } from "@/components/dataroom/nav-rail"
import { FolderSidebar } from "@/components/dataroom/folder-sidebar"
import { Header } from "@/components/dataroom/header"
import { FileGridView } from "@/components/dataroom/file-grid-view"
import { NewFolderDialog } from "@/components/dataroom/new-folder-dialog"
import { UploadOverlay } from "@/components/dataroom/upload-overlay"
import { PreviewSheet } from "@/components/dataroom/preview-sheet"

export default function DataRoomPage() {
  const [activeView, setActiveView] = React.useState("dataroom")
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("grid")
  const [allFiles, setAllFiles] = React.useState<FileType[]>(mockFiles)
  const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = React.useState(new Set<string>())
  const [previewFile, setPreviewFile] = React.useState<FileType | null>(null)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = React.useState(false)
  const [newFolderName, setNewFolderName] = React.useState("")
  const [isDragging, setIsDragging] = React.useState(false)
  const [uploads, setUploads] = React.useState<{ name: string; progress: number }[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const { toast } = useToast()
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const displayedFiles = React.useMemo(() => {
    return allFiles.filter(
      (file) => file.parentId === currentFolderId && file.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [allFiles, currentFolderId, searchTerm])

  const breadcrumbPath = React.useMemo(() => {
    if (currentFolderId === null) return []
    const path: FileType[] = []
    let currentId: string | null = currentFolderId
    while (currentId) {
      const folder = allFiles.find((f) => f.id === currentId)
      if (folder) {
        path.unshift(folder)
        currentId = folder.parentId
      } else {
        currentId = null
      }
    }
    return path
  }, [allFiles, currentFolderId])

  const handleSelectFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFiles((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleFileClick = (file: FileType) => {
    if (file.type === "folder") {
      setCurrentFolderId(file.id)
      setSelectedFiles(new Set())
    } else {
      setPreviewFile(file)
      setIsSheetOpen(true)
    }
  }

  const processFilesForUpload = (files: FileList) => {
    const droppedFiles = Array.from(files)
    const newUploads = droppedFiles.map((file) => ({ name: file.name, progress: 0 }))
    setUploads(newUploads)

    const uploadPromises = droppedFiles.map((file, index) => {
      return uploadFile(file, (progress) => {
        setUploads((prev) => {
          const updated = [...prev]
          if (updated[index]) {
            updated[index] = { ...updated[index], progress }
          }
          return updated
        })
      }).then(() => {
        const newFile: FileType = {
          id: `file-${Date.now()}-${index}`,
          name: file.name,
          type: "default", // You could implement logic to determine file type
          size: `${(file.size / 1024).toFixed(2)} KB`,
          lastModified: new Date().toISOString().split("T")[0],
          owner: "You",
          permissions: "private",
          parentId: currentFolderId,
        }
        return newFile
      })
    })

    Promise.all(uploadPromises).then((newFiles) => {
      setAllFiles((prev) => [...prev, ...newFiles])
      setTimeout(() => {
        setUploads([])
        toast({ title: `${newFiles.length} file(s) uploaded successfully!` })
      }, 1000)
    })
  }

  const handleDragEvents = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent) => {
    handleDragEvents(e)
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    handleDragEvents(e)
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    handleDragEvents(e)
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFilesForUpload(e.dataTransfer.files)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFilesForUpload(e.target.files)
    }
  }

  const handleCreateNewFolder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFolderName.trim()) return
    const newFolder: FileType = {
      id: `folder-${Date.now()}`,
      name: newFolderName,
      type: "folder",
      size: "0 KB",
      lastModified: new Date().toISOString().split("T")[0],
      owner: "You",
      permissions: "private",
      parentId: currentFolderId,
    }
    setAllFiles((prev) => [...prev, newFolder])
    toast({ title: `Folder "${newFolderName}" created.` })
    setNewFolderName("")
    setIsNewFolderDialogOpen(false)
  }

  useHotkeys([
    ["u", handleUploadClick],
    ["n", () => setIsNewFolderDialogOpen(true)],
    ["f", () => searchInputRef.current?.focus()],
  ])

  return (
    <div
      className="flex h-screen bg-gray-50 dark:bg-gray-900"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEvents}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Toaster />
      <NavRail activeView={activeView} setActiveView={setActiveView} />
      <FolderSidebar allFiles={allFiles} currentFolderId={currentFolderId} onFolderSelect={setCurrentFolderId} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onUploadClick={handleUploadClick}
          onNewFolderClick={() => setIsNewFolderDialogOpen(true)}
          onSearch={setSearchTerm}
          breadcrumbPath={breadcrumbPath}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {activeView === "dataroom" ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">{displayedFiles.length} items</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {viewMode === "grid" ? (
                <FileGridView
                  files={displayedFiles}
                  selectedFiles={selectedFiles}
                  onSelectFile={handleSelectFile}
                  onFileClick={handleFileClick}
                />
              ) : (
                <p>List view not implemented in this version.</p>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h2 className="mt-2 text-lg font-medium">Chat with your data</h2>
                <p className="mt-1 text-sm text-gray-500">Coming soon.</p>
              </div>
            </div>
          )}
        </main>
      </div>
      <NewFolderDialog
        isOpen={isNewFolderDialogOpen}
        onOpenChange={setIsNewFolderDialogOpen}
        onSubmit={handleCreateNewFolder}
        value={newFolderName}
        onValueChange={setNewFolderName}
      />
      <UploadOverlay isDragging={isDragging} uploads={uploads} />
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" multiple />
      <PreviewSheet file={previewFile} isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  )
}
