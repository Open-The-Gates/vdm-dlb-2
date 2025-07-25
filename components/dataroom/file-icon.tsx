import type React from "react"
import {
  Folder,
  File,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  FileVideo,
  FileAudio,
  FileCode,
} from "lucide-react"
import { cn } from "@/lib/utils"

export const FileIcon = ({ type, className }: { type: string; className?: string }) => {
  const iconMap: { [key: string]: React.ElementType } = {
    folder: Folder,
    pdf: FileText,
    excel: FileSpreadsheet,
    image: FileImage,
    zip: FileArchive,
    video: FileVideo,
    audio: FileAudio,
    code: FileCode,
    default: File,
  }
  const IconComponent = iconMap[type] || iconMap.default
  return <IconComponent className={cn("h-5 w-5 text-gray-500", className)} />
}
