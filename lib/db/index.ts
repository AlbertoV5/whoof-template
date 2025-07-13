import { databaseConfig, devDatabaseConfig } from "@/lib/config"
import * as schema from "./schema"
import {
  getDatabasePoolHandler,
  getDatabaseConnectionHandler,
  getMigratorHandler,
} from "@whoof/db"

export const withDatabasePool = getDatabasePoolHandler({
  schema,
  databaseConfig,
  dev: devDatabaseConfig,
})
export const getDatabase = getDatabaseConnectionHandler({
  schema,
  databaseConfig,
  dev: devDatabaseConfig,
})
export const migrator = getMigratorHandler({
  schema,
  operationalDatabase: "postgres",
  databaseConfig,
})
