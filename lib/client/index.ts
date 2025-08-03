import type { API } from "../server/api"
import { hc } from "hono/client"

export const client = hc<API>("/")
