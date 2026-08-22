import type {
  HttpHeaders,
  HttpMethod,
  HttpQuery,
  HttpResponse,
} from "./http.js";

export type HttpClientRequest = {
  url: string;
  method: HttpMethod;
  query?: HttpQuery;
  body?: unknown;
  headers?: HttpHeaders;
};

export interface HttpClient {
  request(input: HttpClientRequest): Promise<HttpResponse>;
}
