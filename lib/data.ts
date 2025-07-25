export type Activity = {
  id: string
  timestamp: string
  user: string
  action: string
}

export type File = {
  id: string
  name: string
  type: "folder" | "pdf" | "excel" | "image" | "zip" | "video" | "audio" | "code" | "default"
  size: string
  lastModified: string
  owner: string
  permissions: "private" | "public"
  description?: string
  parentId: string | null
  tags?: string[]
  activity?: Activity[]
  url?: string
}

export const mockFiles: File[] = [
  // Root folders
  {
    id: "1",
    name: "Financial Reports",
    type: "folder",
    size: "1.2 GB",
    lastModified: "2024-07-20",
    owner: "Alice",
    permissions: "private",
    parentId: null,
  },
  {
    id: "2",
    name: "Legal Documents",
    type: "folder",
    size: "512 MB",
    lastModified: "2024-07-19",
    owner: "Alice",
    permissions: "private",
    parentId: null,
  },
  // Files in "Financial Reports"
  {
    id: "3",
    name: "Q4_2023_Report.pdf",
    type: "pdf",
    size: "1.95 MB",
    lastModified: "2024-01-14",
    owner: "John Doe",
    permissions: "private",
    parentId: "1",
    tags: ["quarterly", "financial"],
    description: "The final quarterly financial report for 2023, including revenue analysis and projections.",
    activity: [
      { id: "a1", timestamp: "2024-07-24 10:00", user: "John Doe", action: "Uploaded file" },
      { id: "a2", timestamp: "2024-07-24 11:30", user: "Alice", action: "Viewed file" },
    ],
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "4",
    name: "Budget_Analysis.xlsx",
    type: "excel",
    size: "1000 KB",
    lastModified: "2024-01-12",
    owner: "Jane Smith",
    permissions: "private",
    parentId: "1",
    tags: ["budget", "analysis"],
    description: "Detailed budget analysis and forecast for the upcoming fiscal year.",
    activity: [{ id: "a3", timestamp: "2024-07-23 15:00", user: "Jane Smith", action: "Created file" }],
    url: "https://go.microsoft.com/fwlink/?LinkID=521962",
  },
  {
    id: "7",
    name: "Marketing_Campaign_Banner.png",
    type: "image",
    size: "3.5 MB",
    lastModified: "2024-06-15",
    owner: "Marketing Team",
    permissions: "public",
    parentId: null,
    tags: ["marketing", "q3-campaign"],
    url: "/placeholder.svg?width=800&height=600",
    description: "Official banner for the Q3 marketing campaign.",
    activity: [{ id: "a4", timestamp: "2024-06-15 09:00", user: "Carol", action: "Uploaded file" }],
  },
  // Files in "Legal Documents"
  {
    id: "5",
    name: "MSA_Acme_Corp.pdf",
    type: "pdf",
    size: "5.2 MB",
    lastModified: "2024-05-10",
    owner: "Legal Team",
    permissions: "private",
    parentId: "2",
    tags: ["contract", "msa"],
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  // A file in the root
  {
    id: "6",
    name: "Onboarding Guide.pdf",
    type: "pdf",
    size: "2.1 MB",
    lastModified: "2024-03-01",
    owner: "HR",
    permissions: "public",
    parentId: "home",
  },
  {
    id: "9",
    name: "Sub-Financials",
    type: "folder",
    size: "300 MB",
    lastModified: "2024-07-24",
    owner: "Alice",
    permissions: "private",
    parentId: "1",
  },
]
