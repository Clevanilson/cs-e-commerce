export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export type HttpHeaders = Record<string, string | string[] | undefined>;

export type HttpQuery = Record<string, unknown>;

export type HttpRequest = {
  params: Record<string, string>;
  query: HttpQuery;
  body: unknown;
  headers: HttpHeaders;
};

export type HttpResponse = {
  statusCode: number;
  body: unknown;
  headers?: HttpHeaders;
};
