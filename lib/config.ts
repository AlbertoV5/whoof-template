import { env } from "./env"

export const databaseConfig = {
  database: "my-db-name",
  secretArn: "my-secret-arn",
  resourceArn: "my-resource-arn",
}
export const devDatabaseConfig = {
  connectionString: env.DB_URL,
  developmentMode: env.NODE_ENV !== "production",
}
