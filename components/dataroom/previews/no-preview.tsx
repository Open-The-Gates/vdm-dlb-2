"use client"

import { FileWarning } from "lucide-react"

export const NoPreview = () => (
  <div className="flex h-full flex-col items-center justify-center bg-gray-100 text-gray-500 dark:bg-gray-800">
    <FileWarning className="h-16 w-16" />
    <p className="mt-4 text-lg font-medium">No preview available</p>
  </div>
)
