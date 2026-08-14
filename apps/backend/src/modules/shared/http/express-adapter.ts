import express, {
  type Express,
  type Request,
  type Response,
} from "express";
import type {
  HttpHandler,
  HttpMethod,
  HttpServer,
} from "./http-server.js";

export class ExpressAdapter implements HttpServer {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: HttpMethod, path: string, handler: HttpHandler): void {
    this.app[method](path, async (req: Request, res: Response) => {
      const output = await handler({
        params: req.params as Record<string, string>,
        query: req.query as Record<string, unknown>,
        body: req.body,
        headers: req.headers,
      });

      res.status(output.statusCode).json(output.body);
    });
  }

  listen(port: number): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(port, () => {
        console.log(`HTTP server listening on port ${port}`);
        resolve();
      });
    });
  }
}
