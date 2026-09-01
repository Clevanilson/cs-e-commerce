import { afterEach, beforeEach, describe, expect, it } from "vitest";
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

  beforeEach(async () => {
    sut = new ExpressAdapter();
    sut.on("get", "/health", () => ({
      statusCode: 200,
      body: { ok: true },
    }));
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
