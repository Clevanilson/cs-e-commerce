import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresAdapter } from "./postgres-adapter.js";
import { DB_DEFAULT_TEST_CONFIG } from "./default-test-config.js";


describe("PostgresAdapter", () => {
  const database = new PostgresAdapter(DB_DEFAULT_TEST_CONFIG);

  beforeAll(async () => {
    await database.connect();
  }, 15_000);

  afterAll(async () => {
    await database.disconnect();
  });

  it("connects and runs a simple query", async () => {
    const result = await database.query<{ connected: number }>(
      "SELECT 1 AS connected",
    );
    expect(result.rowCount).toBe(1);
    expect(result.rows[0]?.connected).toBe(1);
  });
});
