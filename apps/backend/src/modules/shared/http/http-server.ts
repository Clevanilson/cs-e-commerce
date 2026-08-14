export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export type HttpRequest = {
  params: Record<string, string>;
  query: Record<string, unknown>;
  body: unknown;
  headers: Record<string, string | string[] | undefined>;
};

export type HttpResponse = {
  statusCode: number;
  body: unknown;
};

export type HttpHandler = (
  request: HttpRequest,
) => Promise<HttpResponse> | HttpResponse;

export interface HttpServer {
  on(method: HttpMethod, path: string, handler: HttpHandler): void;
  listen(port: number): Promise<void>;
}
