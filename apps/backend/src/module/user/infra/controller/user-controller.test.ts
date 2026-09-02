import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { DB_DEFAULT_CONFIG } from "@shared/database/default-config";
import { PostgresAdapter } from "@shared/database/postgres-adapter";
import { ExpressAdapter } from "@shared/http/express-adapter";
import { FetchAdapter } from "@shared/http/fetch-adapter";
import type { HttpClient } from "@shared/http/http-client";
import { JwtTokenGenerator } from "@shared/token/jwt-token-generator";
import { LoginUser } from "@/application/use-case/login-user";
import { RegisterUser } from "@/application/use-case/register-user";
import { PostgresUserRepository } from "@/infra/repository/postgres-user-repository";
import { UserController } from "./user-controller.js";

describe(UserController.name, () => {
  const httpServer = new ExpressAdapter();
  const database = new PostgresAdapter(DB_DEFAULT_CONFIG);
  const userRepository = new PostgresUserRepository(database);
  let sut: UserController;
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

  it("accepts a valid login", async () => {
    const email = `gustave-${randomUUID()}@example.com`;
    const name = "Gustave";
    await httpClient.request({
      method: "post",
      url: "/api/auth/register",
      body: {
        name,
        email,
        password: "secret123",
      },
    });
    const response = await httpClient.request({
      method: "post",
      url: "/api/auth/login",
      body: {
        email,
        password: "secret123",
      },
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name });
    expect(response.headers?.["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringMatching(/token=.+;.*HttpOnly/i)]),
    );
  });

  it("rejects an invalid login", async () => {
    const response = await httpClient.request({
      method: "post",
      url: "/api/auth/login",
      body: {
        email: "unknown@example.com",
        password: "secret123",
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: {
        message: "Invalid credentials",
      },
    });
  });

  beforeAll(async () => {
    await database.connect();
    await userRepository.ensureSchema();
    sut = new UserController(
      httpServer,
      new RegisterUser(userRepository),
      new LoginUser(userRepository, new JwtTokenGenerator("secret")),
    );
    await httpServer.listen(0);
    httpClient = new FetchAdapter({ baseUrl: httpServer.getUrl() });
  }, 15_000);

  afterAll(async () => {
    await httpServer.close();
    await database.disconnect();
  });
});
