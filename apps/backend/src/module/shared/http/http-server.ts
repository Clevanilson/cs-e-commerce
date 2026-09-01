import type { HttpMethod, HttpRequest } from "@shared/http/http";

export type HttpHandler = (
  request: HttpRequest,
) => Promise<unknown> | unknown;

export interface HttpServer {
  on(
    method: HttpMethod,
    path: string,
    handler: HttpHandler,
    statusCode?: number,
  ): void;
  listen(port: number): Promise<void>;
}
