export type SqlDatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export type SqlQueryResult<T = unknown> = {
  rows: T[];
  rowCount: number;
};

export interface SqlDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T = unknown>(
    sql: string,
    params?: unknown[],
  ): Promise<SqlQueryResult<T>>;
}
