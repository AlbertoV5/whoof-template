import { WhopServerSdk } from "@whop/api"
import { env } from "./env"

export const whopSdk = WhopServerSdk({
  appId: env.NEXT_PUBLIC_WHOP_APP_ID,
  appApiKey: env.WHOP_API_KEY,
  onBehalfOfUserId: env.NEXT_PUBLIC_WHOP_AGENT_USER_ID,
  companyId: env.NEXT_PUBLIC_WHOP_COMPANY_ID,
})
