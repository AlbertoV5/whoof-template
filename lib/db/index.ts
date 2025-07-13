import * as schema from "./schema"
import { env } from "@/lib/env"
import {
  getDatabasePoolHandler,
  getDatabaseConnectionHandler,
  getMigratorHandler,
} from "@whoof/db"

const databaseConfig = {
  database: env.DB_NAME,
  secretArn: env.DB_SECRET_ARN,
  resourceArn: env.DB_RESOURCE_ARN,
}
const devConfig = {
  connectionString: env.DB_URL,
  developmentMode: env.NODE_ENV !== "production",
}
export const withDatabasePool = getDatabasePoolHandler({
  schema,
  databaseConfig,
  dev: devConfig,
})
export const getDatabase = getDatabaseConnectionHandler({
  schema,
  databaseConfig,
  dev: devConfig,
})
export const migrator = getMigratorHandler({
  schema,
  operationalDatabase: "postgres",
  databaseConfig,
})
