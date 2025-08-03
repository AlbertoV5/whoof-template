import { getDatabasePoolHandler, getMigratorHandler } from "@whoof/db"
import { databaseConfig, devDatabaseConfig } from "@/lib/config/db.config"
import * as schema from "./schema"

export const withDatabasePool = getDatabasePoolHandler({
  schema,
  databaseConfig,
  dev: devDatabaseConfig,
})
export const migrator = getMigratorHandler({
  schema,
  databaseConfig,
  onSuccess: async ({ schema, withDatabasePool }) => {
    console.log("Migration successful!")
  },
})
