import { createSubscriptionAccessModel } from "@whoof/config"

export const appMetadata = {
  title: "My Whop App",
  description: "This is the start of your Whop App. Have fun building!",
}
export const appTheme = {
  accentColor: "blue",
  appearance: "inherit",
} as const
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
