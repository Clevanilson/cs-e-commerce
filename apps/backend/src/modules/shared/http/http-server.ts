import type { HttpMethod, HttpRequest, HttpResponse } from "./http.js";

export type HttpHandler = (
  request: HttpRequest,
) => Promise<HttpResponse> | HttpResponse;

export interface HttpServer {
  on(method: HttpMethod, path: string, handler: HttpHandler): void;
  listen(port: number): Promise<void>;
}
