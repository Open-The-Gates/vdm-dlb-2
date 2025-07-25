"use client"

import Image from "next/image"

export const ImageViewer = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="relative h-full w-full">
      <Image src={src || "/placeholder.svg"} alt={alt} layout="fill" objectFit="contain" />
    </div>
  </div>
)
