"use client"

import type { Activity } from "@/lib/data"

export const ActivityFeed = ({ activities }: { activities: Activity[] }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Activity</h3>
    <ul className="space-y-3">
      {activities.map((activity) => (
        <li key={activity.id} className="flex items-start text-sm">
          <div className="mr-3 h-8 w-8 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div>
            <p>
              <span className="font-medium">{activity.user}</span> {activity.action}
            </p>
            <p className="text-xs text-gray-500">{activity.timestamp}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)
