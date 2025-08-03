import { createSubscriptionAccessModel } from "@whoof/config"

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
