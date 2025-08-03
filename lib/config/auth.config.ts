import { AuthenticatedUser } from "@whoof/auth"
import { createSubscriptionAccessModel } from "@whoof/config"

export type TierKey = keyof typeof accessModel.tiers
export type UserStatus = "developer" | "creator" | "user"
export type User = AuthenticatedUser<UserStatus, TierKey>
export type AccessModel = typeof accessModel

export const accessModel = createSubscriptionAccessModel({
  tierOrder: ["free", "premium"],
  tiers: {
    free: {
      name: "Free",
      isFree: true,
      isAvailable: true,
      checkout: null,
      properties: {},
    },
    premium: {
      name: "Premium",
      isFree: false,
      isAvailable: true,
      checkout: null,
      properties: {},
    },
  },
})
