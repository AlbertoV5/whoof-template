import {
  AuthenticatedProps,
  CredentialsOptions,
  getCachedUserAuthentication,
  getExperienceId,
} from "@whoof/auth"
import { whopSdk } from "./whop-sdk"
import { cache } from "react"
import { env } from "./env"

export function withAuth<Inputs extends Record<string, any>, Output>(
  options: CredentialsOptions,
  wrapped: (inputProps: AuthenticatedProps<Inputs>) => Promise<Output>
) {
  return async (rawProps?: Inputs & { experienceId?: string }) => {
    const props = rawProps || ({} as Inputs)
    const experienceId = rawProps?.experienceId || getExperienceId()
    const user = await getAuthenticatedUser(experienceId)
    if (!user) {
      throw new Error("Unauthorized")
    }
    const { requiredAccessLevel, requiredUserStatus } = options
    if (requiredAccessLevel && user.userAccessLevel !== requiredAccessLevel) {
      throw new Error("Unauthorized, access level mismatch")
    }
    if (requiredUserStatus && user.userStatus !== requiredUserStatus) {
      throw new Error("Unauthorized, user status mismatch")
    }
    return wrapped({ ...props, userData: user, experienceId })
  }
}

// Cache user authentication for the entire request
export const getAuthenticatedUser = cache(async (experienceId: string) => {
  return getCachedUserAuthentication(
    whopSdk,
    experienceId,
    ({ userId, accessLevel }: { userId: string; accessLevel: any }) => {
      if (!accessLevel || accessLevel === "no_access") return null
      if (env.WHOP_DEV_USER_IDS.includes(userId)) {
        return "developer"
      }
      if (accessLevel === "admin") {
        return "creator"
      }
      if (accessLevel === "customer") {
        return "user"
      }
      return null
    },
    async (headersList: Headers) => {
      const apiSecret = headersList.get("Authorization")?.split(" ")[1]
      if (apiSecret) {
        if (apiSecret !== env.API_SECRET) {
          throw new Error("Unauthorized")
        }
        return {
          userData: {
            userId: "system",
            userStatus: "developer",
            userAccessLevel: "admin",
          },
          apiSecret,
        }
      }
      return null
    }
  )
})
