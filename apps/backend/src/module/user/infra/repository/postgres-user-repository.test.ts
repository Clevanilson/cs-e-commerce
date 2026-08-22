import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { DB_DEFAULT_CONFIG } from "@shared/database/default-config";
import { PostgresAdapter } from "@shared/database/postgres-adapter";
import { User } from "@/domain/entity/user";
import { PostgresUserRepository } from "./postgres-user-repository.js";

describe(PostgresUserRepository.name, () => {
  const database = new PostgresAdapter(DB_DEFAULT_CONFIG);
  let sut: PostgresUserRepository;
  let user: User;

  it("saves a user and finds it by email", async () => {
    await sut.save(user);
    const found = await sut.findByEmail(user.email.toUpperCase());
    expect(found).not.toBeNull();
    expect(found?.id).toBe(user.id);
    expect(found?.email).toBe(user.email);
  });

  it("returns null when the email is not registered", async () => {
    const found = await sut.findByEmail(`${randomUUID()}@example.com`);
    expect(found).toBeNull();
  });

  beforeAll(async () => {
    await database.connect();
    sut = new PostgresUserRepository(database);
    await sut.ensureSchema();
  }, 15_000);

  afterAll(async () => {
    await database.disconnect();
  });

  beforeEach(() => {
    user = new User({
      name: "Ren Amamiya",
      email: `${randomUUID()}@example.com`,
      password: "secret123",
    });
  });
});
