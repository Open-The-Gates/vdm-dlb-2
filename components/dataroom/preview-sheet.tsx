"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { File as FileType } from "@/lib/data";
import dynamic from "next/dynamic";
import { ExcelViewer } from "./previews/excel-viewer";
import { ImageViewer } from "./previews/image-viewer";
import { NoPreview } from "./previews/no-preview";
import { MetadataPanel } from "./metadata-panel";
import { ActivityFeed } from "./activity-feed";

// Dynamically import PDF viewer to prevent SSR issues
const PdfViewer = dynamic(
  () =>
    import("./previews/pdf-viewer").then((mod) => ({ default: mod.PdfViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading PDF viewer...</p>
        </div>
      </div>
    ),
  }
);

const FilePreview = ({ file }: { file: FileType }) => {
  if (!file.url) {
    return <NoPreview />;
  }

  switch (file.type) {
    case "pdf":
      return <PdfViewer url={file.url} />;
    case "excel":
      return <ExcelViewer url={file.url} />;
    case "image":
      return (
        <ImageViewer src={file.url || "/placeholder.svg"} alt={file.name} />
      );
    default:
      return <NoPreview />;
  }
};

export const PreviewSheet = ({
  file,
  isOpen,
  onOpenChange,
}: {
  file: FileType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!file) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full p-0 sm:max-w-none md:w-4/5 lg:w-3/4 xl:w-2/3 flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between p-4 border-b">
          <SheetTitle className="truncate">{file.name}</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden">
          <div className="md:col-span-2 lg:col-span-3 h-full overflow-hidden">
            <FilePreview file={file} />
          </div>
          <div className="h-full overflow-y-auto p-4 space-y-6 border-l">
            <MetadataPanel file={file} />
            <Separator />
            {file.activity && <ActivityFeed activities={file.activity} />}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
