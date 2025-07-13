// Type-safe env
import { config } from "dotenv"
import { expand } from "dotenv-expand"
import path from "node:path"
import { z } from "zod"

expand(config({ path: path.resolve(process.cwd(), "../../.env") }))
const envSchema = z
  .object({
    NODE_ENV: z.string().default("development"),
    WHOP_API_KEY: z.string(),
    NEXT_PUBLIC_WHOP_AGENT_USER_ID: z.string(),
    NEXT_PUBLIC_WHOP_COMPANY_ID: z.string(),
    NEXT_PUBLIC_WHOP_APP_ID: z.string(),
    WHOP_DEV_USER_IDS: z
      .string()
      .transform((str) => str.split(",").map((s) => s.trim())),
    API_SECRET: z.string().default("secret"),
    DB_URL: z.string(),
    DB_NAME: z.string(),
    DB_SECRET_ARN: z.string(),
    DB_RESOURCE_ARN: z.string(),
  })
  .superRefine((input, ctx) => {})

export type Env = z.infer<typeof envSchema>
// eslint-disable-next-line ts/no-redeclare
let env: Env
try {
  env = envSchema.parse(process.env)
  console.log("Environment successfully loaded")
} catch (error) {
  console.error("Failed to load environment variables:")
  if (error instanceof z.ZodError) {
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2))
  } else {
    console.error(error)
  }
  process.exit(1)
}
export { env }
