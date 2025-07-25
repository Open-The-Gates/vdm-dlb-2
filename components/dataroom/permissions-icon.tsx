import { Globe, User } from "lucide-react"

export const PermissionsIcon = ({ permissions }: { permissions: string }) => {
  if (permissions === "private") {
    return <User className="h-3 w-3" />
  }
  return <Globe className="h-3 w-3" />
}
