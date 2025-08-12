import { getDatabasePoolHandler, getMigratorHandler } from "@whoof/db"
import * as schema from "./schema"
import { env } from "../server/env"
import type { AwsDataApiPgDatabase } from "drizzle-orm/aws-data-api/pg"

export const databaseConfig = {
  database: "my-db-name",
  secretArn: "my-secret-arn",
  resourceArn: "my-resource-arn",
}
export const devDatabaseConfig = {
  connectionString: env.DB_URL,
  developmentMode: env.NODE_ENV !== "production",
}
export type Database = AwsDataApiPgDatabase<typeof schema>
export const withDatabase = getDatabasePoolHandler({
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
