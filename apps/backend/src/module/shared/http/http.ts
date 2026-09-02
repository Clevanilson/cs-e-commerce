export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export type HttpHeaders = Record<string, string | string[] | undefined>;

export type HttpQuery = Record<string, unknown>;

export type HttpRequest = {
  params: Record<string, string>;
  query: HttpQuery;
  body: unknown;
  headers: HttpHeaders;
};

export type HttpCookieOptions = {
  httpOnly?: boolean;
  path?: string;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
  maxAge?: number;
};

export type HttpReply = {
  cookie(name: string, value: string, options?: HttpCookieOptions): void;
};

export type HttpResponse = {
  statusCode: number;
  body: unknown;
  headers?: HttpHeaders;
};
