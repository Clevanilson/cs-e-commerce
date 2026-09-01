import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { DB_DEFAULT_CONFIG } from "@shared/database/default-config";
import { PostgresAdapter } from "@shared/database/postgres-adapter";
import { ExpressAdapter } from "@shared/http/express-adapter";
import { FetchAdapter } from "@shared/http/fetch-adapter";
import type { HttpClient } from "@shared/http/http-client";
import { RegisterUser } from "@/application/use-case/register-user";
import { PostgresUserRepository } from "@/infra/repository/postgres-user-repository";
import { RegisterController } from "./register-controller.js";

describe(RegisterController.name, () => {
  const httpServer = new ExpressAdapter();
  const database = new PostgresAdapter(DB_DEFAULT_CONFIG);
  const userRepository = new PostgresUserRepository(database);
  let sut: RegisterController;
  let httpClient: HttpClient;

  it("accepts a valid case", async () => {
    const email = `strohl-${randomUUID()}@example.com`;
    const response = await httpClient.request({
      method: "post",
      url: "/api/auth/register",
      body: {
        name: "Leon Strohl",
        email,
        password: "secret123",
      },
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: "Leon Strohl",
      email,
      role: "CUSTOMER",
    });
  });

  it("rejects an invalid case", async () => {
    const response = await httpClient.request({
      method: "post",
      url: "/api/auth/register",
      body: {
        name: "",
        email: "not-an-email",
        password: "123",
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: {
        message: expect.any(String),
      },
    });
  });

  beforeAll(async () => {
    await database.connect();
    await userRepository.ensureSchema();
    sut = new RegisterController(httpServer, new RegisterUser(userRepository));
    await httpServer.listen(0);
    httpClient = new FetchAdapter({ baseUrl: httpServer.getUrl() });
  }, 15_000);

  afterAll(async () => {
    await httpServer.close();
    await database.disconnect();
  });
});
