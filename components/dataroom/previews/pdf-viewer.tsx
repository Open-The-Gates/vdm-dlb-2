"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ZoomIn,
  ZoomOut,
  Download,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Set up worker to avoid issues with bundlers
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

export const PdfViewer = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    if (pageNumber > 1) {
      changePage(-1);
    }
  }

  function nextPage() {
    if (numPages && pageNumber < numPages) {
      changePage(1);
    }
  }

  const handleZoom = (newZoom: number) => {
    setZoom(Math.max(0.5, Math.min(3, newZoom)));
  };

  const loadingElement = (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );

  const errorElement = (
    <div className="flex h-full flex-col items-center justify-center text-red-500">
      <AlertCircle className="h-8 w-8" />
      <p className="mt-2">Error loading PDF file.</p>
    </div>
  );

  if (!isClient) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading PDF viewer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-gray-200 dark:bg-gray-700">
      <div className="flex flex-shrink-0 items-center justify-between border-b bg-gray-100 p-2 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={previousPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {pageNumber} of {numPages || "--"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextPage}
            disabled={!numPages || pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleZoom(zoom - 0.2)}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleZoom(zoom + 0.2)}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <a href={url} download>
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </a>
          <Button variant="ghost" size="icon">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={loadingElement}
          error={errorElement}
          className="flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            scale={zoom}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};
