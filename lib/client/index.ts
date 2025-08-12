import type { API } from "../api"
import { hc } from "hono/client"
import { useMemo } from "react"

/**
 * Client wrapper that adds experience ID to headers
 *
 * This creates a client that automatically includes the x-whop-experience-id header
 * with all API requests, which is what the auth middleware expects.
 *
 * Usage:
 * ```tsx
 * import { useAPIClient } from '@/lib/client'
 *
 * function MyComponent({ experience }) {
 *   const client = useAPIClient(experience.id)
 *
 *   // All API calls will automatically include x-whop-experience-id header
 *   const response = await client.api.mirrors.$get()
 * }
 * ```
 */
export function useAPIClient(experienceId: string) {
  const finalExperienceId = experienceId
  const client = useMemo(() => {
    if (!finalExperienceId) {
      console.warn("Experience ID not found in URL params or props")
      return hc<API>("/")
    }
    return hc<API>("/", {
      headers: {
        "x-whop-experience-id": finalExperienceId,
      },
    })
  }, [finalExperienceId])

  return client
}
export type APIClient = ReturnType<typeof useAPIClient>
