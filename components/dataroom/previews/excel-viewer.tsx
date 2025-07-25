"use client"

import { useState, useEffect } from "react"
import * as XLSX from "xlsx"
import { Loader2, AlertCircle } from "lucide-react"

type ExcelRow = { [key: string]: any }

export const ExcelViewer = ({ url }: { url: string }) => {
  const [data, setData] = useState<ExcelRow[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`)
        }
        const arrayBuffer = await response.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer, { type: "buffer" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        if (jsonData.length > 0) {
          setHeaders(jsonData[0])
          const rows = jsonData.slice(1).map((rowArray) => {
            const rowObject: ExcelRow = {}
            jsonData[0].forEach((header, index) => {
              rowObject[header] = rowArray[index]
            })
            return rowObject
          })
          setData(rows)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-red-500">
        <AlertCircle className="h-8 w-8" />
        <p className="mt-2">Error loading Excel file.</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border p-2 font-semibold text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="min-w-[120px] border p-2 truncate">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
