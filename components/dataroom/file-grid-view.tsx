"use client"

import type * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { File as FileType } from "@/lib/data"
import { FileIcon } from "./file-icon"
import { PermissionsIcon } from "./permissions-icon"

export const FileGridView = ({
  files,
  selectedFiles,
  onSelectFile,
  onFileClick,
}: {
  files: FileType[]
  selectedFiles: Set<string>
  onSelectFile: (id: string, e: React.MouseEvent) => void
  onFileClick: (file: FileType) => void
}) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {files.map((file) => (
      <Card
        key={file.id}
        className={cn(
          "group cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl",
          selectedFiles.has(file.id) && "ring-2 ring-primary",
        )}
        onClick={() => onFileClick(file)}
      >
        <CardHeader className="relative p-0">
          <div className="absolute left-3 top-3 z-10">
            <div
              onClick={(e) => onSelectFile(file.id, e)}
              className={cn(
                "h-5 w-5 rounded-full border-2 bg-card transition-all",
                selectedFiles.has(file.id)
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/50 group-hover:border-primary/50",
              )}
            >
              {selectedFiles.has(file.id) && (
                <div className="h-full w-full scale-50 rounded-full bg-primary-foreground" />
              )}
            </div>
          </div>
          <div className="absolute right-3 top-3 z-10">
            <PermissionsIcon permissions={file.permissions} />
          </div>
          <div className="flex h-32 items-center justify-center rounded-t-2xl bg-muted/50 dark:bg-muted/20">
            <FileIcon type={file.type} className="h-10 w-10" />
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <span>{file.size}</span>
            <span className="mx-1.5">&middot;</span>
            <span>{file.lastModified}</span>
          </div>
          <p className="mt-1 truncate text-xs text-muted-foreground">{file.owner}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {file.tags?.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary/80"
              >
                {tag}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)
