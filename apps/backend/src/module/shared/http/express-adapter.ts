import type { Server } from "node:http";
import express, { type Express, type Request, type Response } from "express";
import { serve, setup } from "swagger-ui-express";
import { ApplicationError } from "@shared/error/application-error";
import { DomainError } from "@shared/error/domain-error";
import type {
  HttpCookieOptions,
  HttpMethod,
  HttpQuery,
  HttpReply,
  HttpResponse,
} from "@shared/http/http";
import type { HttpHandler, HttpServer } from "@shared/http/http-server";

export class ExpressAdapter implements HttpServer {
  private readonly app: Express;
  private server: Server | undefined;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(
    method: HttpMethod,
    path: string,
    handler: HttpHandler,
    statusCode = 200,
  ): void {
    this.app[method](
      this.toApiPath(path),
      async (req: Request, res: Response) => {
        try {
          const cookies: PendingCookie[] = [];
          const body = await handler(
            this.toHttpRequest(req),
            this.toHttpReply(cookies),
          );
          this.writeResponse(res, { statusCode, body }, cookies);
        } catch (error) {
          this.writeResponse(res, this.toErrorResponse(error));
        }
      },
    );
  }

  docs(path: string, spec: Record<string, unknown>): void {
    this.app.use(this.toApiPath(path), ...serve, setup(spec));
  }

  listen(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(port, () => {
        this.server?.off("error", reject);
        console.log(`HTTP server listening on port ${this.getPort()}`);
        resolve();
      });
      this.server.once("error", reject);
    });
  }

  close(): Promise<void> {
    const server = this.server;
    if (!server) {
      return Promise.resolve();
    }
    this.server = undefined;
    return new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  getUrl(): string {
    return `http://127.0.0.1:${this.getPort()}`;
  }

  private toHttpRequest(req: Request) {
    return {
      params: req.params as Record<string, string>,
      query: req.query as HttpQuery,
      body: req.body,
      headers: req.headers,
    };
  }

  private toErrorResponse(error: unknown): HttpResponse {
    if (error instanceof DomainError || error instanceof ApplicationError) {
      return { statusCode: 400, body: { error: { message: error.message } } };
    }
    return { statusCode: 500, body: { error: { message: "Internal server error" } } };
  }

  private writeResponse(
    res: Response,
    output: HttpResponse,
    cookies: PendingCookie[] = [],
  ): void {
    this.applyHeaders(res, output);
    this.applyCookies(res, cookies);
    res.status(output.statusCode).json(output.body);
  }

  private toHttpReply(cookies: PendingCookie[]): HttpReply {
    return {
      cookie(name, value, options = {}) {
        cookies.push({ name, value, options });
      },
    };
  }

  private applyCookies(res: Response, cookies: PendingCookie[]): void {
    for (const cookie of cookies) {
      res.cookie(cookie.name, cookie.value, cookie.options);
    }
  }

  private applyHeaders(res: Response, output: HttpResponse): void {
    if (!output.headers) {
      return;
    }
    for (const [name, value] of Object.entries(output.headers)) {
      if (value !== undefined) {
        res.set(name, value);
      }
    }
  }

  private toApiPath(path: string): string {
    return `/api${path}`;
  }

  private getPort(): number {
    const address = this.server?.address();
    if (!address || typeof address === "string") {
      throw new Error("HTTP server is not listening");
    }
    return address.port;
  }
}

type PendingCookie = {
  name: string;
  value: string;
  options: HttpCookieOptions;
};
