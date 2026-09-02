import type { HttpHeaders, HttpQuery, HttpResponse } from "@shared/http/http";
import type { HttpClient, HttpClientRequest } from "@shared/http/http-client";

export type FetchAdapterConfig = {
  baseUrl?: string;
};

export class FetchAdapter implements HttpClient {
  private readonly baseUrl: string;

  constructor(config: FetchAdapterConfig = {}) {
    this.baseUrl = config.baseUrl ?? "";
  }

  async request(input: HttpClientRequest): Promise<HttpResponse> {
    const url = this.buildUrl(input.url, input.query);
    const headers = this.toFetchHeaders(input.headers);
    const requestInit = this.buildRequestInit(input, headers);
    const response = await fetch(url, requestInit);
    return this.toHttpResponse(response);
  }

  private buildRequestInit(
    input: HttpClientRequest,
    headers: Record<string, string>,
  ): RequestInit {
    const requestInit: RequestInit = {
      method: input.method.toUpperCase(),
      headers,
    };
    if (input.body !== undefined && input.method !== "get") {
      requestInit.body = JSON.stringify(input.body);
      this.setJsonContentType(headers);
    }
    return requestInit;
  }

  private setJsonContentType(headers: Record<string, string>): void {
    if (!this.hasHeader(headers, "content-type")) {
      headers["content-type"] = "application/json";
    }
  }

  private async toHttpResponse(response: Response): Promise<HttpResponse> {
    return {
      statusCode: response.status,
      body: await this.parseBody(response),
      headers: this.fromFetchHeaders(response.headers),
    };
  }

  private buildUrl(path: string, query?: HttpQuery): string {
    const absoluteUrl = this.isAbsoluteUrl(path)
      ? path
      : this.joinBaseUrl(path);
    return this.appendQuery(absoluteUrl, query);
  }

  private isAbsoluteUrl(path: string): boolean {
    return /^https?:\/\//i.test(path);
  }

  private joinBaseUrl(path: string): string {
    if (!this.baseUrl) {
      return path;
    }
    const normalizedBaseUrl = this.baseUrl.replace(/\/+$/, "");
    const normalizedPath = path.replace(/^\/+/, "");
    return `${normalizedBaseUrl}/${normalizedPath}`;
  }

  private appendQuery(url: string, query?: HttpQuery): string {
    if (!query) {
      return url;
    }
    const queryString = this.toQueryString(query);
    if (!queryString) {
      return url;
    }
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${queryString}`;
  }

  private toQueryString(query: HttpQuery): string {
    const searchParams = new URLSearchParams();
    for (const [name, value] of Object.entries(query)) {
      this.appendQueryValue(searchParams, name, value);
    }
    return searchParams.toString();
  }

  private appendQueryValue(
    searchParams: URLSearchParams,
    name: string,
    value: unknown,
  ): void {
    if (value === undefined || value === null) {
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(name, String(item));
      }
      return;
    }
    searchParams.set(name, String(value));
  }

  private toFetchHeaders(headers?: HttpHeaders): Record<string, string> {
    const result: Record<string, string> = {};
    if (!headers) {
      return result;
    }
    for (const [name, value] of Object.entries(headers)) {
      const serializedValue = this.serializeHeaderValue(value);
      if (serializedValue !== undefined) {
        result[name] = serializedValue;
      }
    }
    return result;
  }

  private serializeHeaderValue(
    value: string | string[] | undefined,
  ): string | undefined {
    if (value === undefined) {
      return undefined;
    }
    return Array.isArray(value) ? value.join(", ") : value;
  }

  private fromFetchHeaders(headers: Headers): HttpHeaders {
    const result: HttpHeaders = {};
    headers.forEach((value, name) => {
      if (name.toLowerCase() !== "set-cookie") {
        result[name] = value;
      }
    });
    const setCookies = headers.getSetCookie();
    if (setCookies.length > 0) {
      result["set-cookie"] = setCookies;
    }
    return result;
  }

  private hasHeader(headers: Record<string, string>, name: string): boolean {
    const normalizedName = name.toLowerCase();
    return Object.keys(headers).some(
      (headerName) => headerName.toLowerCase() === normalizedName,
    );
  }

  private async parseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get("content-type") ?? "";
    const text = await response.text();
    if (text === "") {
      return null;
    }
    if (contentType.includes("application/json")) {
      return JSON.parse(text);
    }
    return text;
  }
}
