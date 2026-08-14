import pg from "pg";
import type {
  SqlDatabase,
  SqlDatabaseConfig,
  SqlQueryResult,
} from "./sql-database.js";

const { Pool } = pg;




export class PostgresAdapter implements SqlDatabase {
  private readonly pool: pg.Pool;
  private connected = false;

  constructor(config: SqlDatabaseConfig) {
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
    });
  }

  async connect(): Promise<void> {
    const client = await this.pool.connect();
    client.release();
    this.connected = true;
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
    this.connected = false;
  }

  async query<T = unknown>(
    sql: string,
    params: unknown[] = [],
  ): Promise<SqlQueryResult<T>> {
    if (!this.connected) {
      throw new Error("PostgresAdapter is not connected");
    }
    const result = await this.pool.query(sql, params);
    return {
      rows: result.rows as T[],
      rowCount: result.rowCount ?? 0,
    };
  }
}
