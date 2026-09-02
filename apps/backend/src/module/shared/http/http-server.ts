import type { HttpMethod, HttpReply, HttpRequest } from "@shared/http/http";

export type HttpHandler = (
  request: HttpRequest,
  reply: HttpReply,
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
