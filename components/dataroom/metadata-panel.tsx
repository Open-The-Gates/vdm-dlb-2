"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { File as FileType } from "@/lib/data"

export const MetadataPanel = ({ file }: { file: FileType }) => {
  const [description, setDescription] = React.useState(file.description || "")

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Metadata</h3>
      </div>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Owner:</span> {file.owner}
        </p>
        <p>
          <span className="font-medium">Size:</span> {file.size}
        </p>
        <p>
          <span className="font-medium">Last Modified:</span> {file.lastModified}
        </p>
      </div>
      <div>
        <Label htmlFor="description" className="font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1"
          rows={4}
        />
        <Button size="sm" className="mt-2">
          Save Description
        </Button>
      </div>
    </div>
  )
}
