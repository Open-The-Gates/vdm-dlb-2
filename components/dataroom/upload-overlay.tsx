"use client"

import { AnimatePresence, motion } from "framer-motion"
import { UploadCloud } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export const UploadOverlay = ({
  isDragging,
  uploads,
}: {
  isDragging: boolean
  uploads: { name: string; progress: number }[]
}) => (
  <AnimatePresence>
    {(isDragging || uploads.length > 0) && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        {uploads.length > 0 ? (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Uploading Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[50vh] overflow-y-auto">
              {uploads.map((upload, index) => (
                <div key={index}>
                  <p className="text-sm font-medium truncate">{upload.name}</p>
                  <Progress value={upload.progress} className="mt-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <>
            <UploadCloud className="h-24 w-24 text-white" />
            <p className="mt-4 text-2xl font-bold text-white">Drop files to upload</p>
          </>
        )}
      </motion.div>
    )}
  </AnimatePresence>
)
