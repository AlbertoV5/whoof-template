import { relations, sql } from "drizzle-orm"
import {
  boolean,
  integer,
  jsonb,
  pgSchema,
  text,
  timestamp,
  uuid,
  unique,
} from "drizzle-orm/pg-core"

export const schema = pgSchema("my-app")
