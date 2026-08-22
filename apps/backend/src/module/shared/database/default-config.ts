import type { SqlDatabaseConfig } from "@shared/database/sql-database";

export const DB_DEFAULT_CONFIG: SqlDatabaseConfig = {
  host: "localhost",
  port: 5432,
  user: "ecommerce",
  password: "ecommerce",
  database: "ecommerce",
};
