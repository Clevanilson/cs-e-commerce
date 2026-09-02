import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ApplicationError } from "@/error/application-error";
import { DomainError } from "@/error/domain-error";
import { FetchAdapter } from "@/http/fetch-adapter";
import type { HttpClient } from "@/http/http-client";
import { ExpressAdapter } from "./express-adapter.js";

describe(ExpressAdapter.name, () => {
  let sut: ExpressAdapter;
  let httpClient: HttpClient;

  it("serves swagger ui at the docs path", async () => {
    const response = await httpClient.request({
      method: "get",
      url: "/api/docs/",
    });
    expect(response.statusCode).toBe(200);
    expect(String(response.body)).toContain("swagger-ui");
  });

  it("serves handlers under the api prefix", async () => {
    const response = await httpClient.request({
      method: "get",
      url: "/api/health",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  it("uses the given success status code", async () => {
    sut.on("post", "/items", () => ({ id: "1" }), 201);
    const response = await httpClient.request({
      method: "post",
      url: "/api/items",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: "1" });
  });

  it("sets http only cookies from the handler", async () => {
    sut.on("post", "/login", (_request, reply) => {
      reply.cookie("token", "abc", { httpOnly: true });
      return { name: "Ada" };
    });
    const response = await httpClient.request({
      method: "post",
      url: "/api/login",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: "Ada" });
    expect(response.headers?.["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringMatching(/token=abc;.*HttpOnly/i)]),
    );
  });

  it.each([
    ["application", new ApplicationError("invalid input")],
    ["domain", new DomainError("invalid input")],
  ])("returns 400 for %s errors", async (_name, error) => {
    sut.on("get", "/fail", () => {
      throw error;
    });
    const response = await httpClient.request({
      method: "get",
      url: "/api/fail",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: { message: "invalid input" } });
  });

  it("returns 500 for other errors", async () => {
    sut.on("get", "/boom", () => {
      throw new Error("secret");
    });
    const response = await httpClient.request({
      method: "get",
      url: "/api/boom",
    });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      error: { message: "Internal server error" },
    });
  });

  beforeEach(async () => {
    sut = new ExpressAdapter();
    sut.on("get", "/health", () => ({ ok: true }));
    sut.docs("/docs", {
      openapi: "3.0.3",
      info: { title: "Test", version: "1.0.0" },
      paths: {},
    });
    await sut.listen(0);
    httpClient = new FetchAdapter({ baseUrl: sut.getUrl() });
  });

  afterEach(async () => {
    await sut.close();
  });
});
