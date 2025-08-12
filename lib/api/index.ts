import { Hono } from "hono"
import root from "./routes"

const api = new Hono().basePath("/api").route("/", root)

export type API = typeof api
export default api
