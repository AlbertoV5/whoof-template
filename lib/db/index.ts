import * as schema from "./schema"
import { env } from "@/lib/env"
import {
  getDatabasePoolHandler,
  getDatabaseConnectionHandler,
  getMigratorHandler,
} from "@whoof/db"

const databaseConfig = {
  database: "database-name",
  secretArn: "secret-arn",
  resourceArn: "resource-arn",
}
const isProduction = process.env.NODE_ENV === "production"

export const withDatabasePool = getDatabasePoolHandler({
  schema,
  databaseConfig,
  dev: {
    connectionString: env.DB_URL,
    developmentMode: !isProduction,
  },
})
export const getDatabase = getDatabaseConnectionHandler({
  schema,
  databaseConfig,
  dev: {
    connectionString: env.DB_URL,
    developmentMode: !isProduction,
  },
})
export const migrator = getMigratorHandler({
  schema,
  operationalDatabase: "postgres",
  databaseConfig,
})
