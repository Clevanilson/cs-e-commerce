import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresAdapter } from "./postgres-adapter.js";
import { DB_DEFAULT_TEST_CONFIG } from "@/database/default-test-config";

describe(PostgresAdapter.name, () => {
  const sut = new PostgresAdapter(DB_DEFAULT_TEST_CONFIG);

  it("connects and runs a simple query", async () => {
    const result = await sut.query<{ connected: number }>(
      "SELECT 1 AS connected",
    );
    expect(result.rowCount).toBe(1);
    expect(result.rows[0]?.connected).toBe(1);
  });

  beforeAll(async () => {
    await sut.connect();
  }, 15_000);

  afterAll(async () => {
    await sut.disconnect();
  });
});
