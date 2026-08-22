import { ApplicationError } from "@shared/error/application-error";
import { DomainError } from "@shared/error/domain-error";
import type { HttpRequest, HttpResponse } from "@shared/http/http";
import type { HttpServer } from "@shared/http/http-server";
import { UserAlreadyExistsError } from "@/application/error/user-already-exists-error";
import type {
  RegisterUser,
  RegisterUserInput,
} from "@/application/use-case/register-user";

export class RegisterController {
  constructor(
    httpServer: HttpServer,
    private readonly registerUser: RegisterUser,
  ) {
    httpServer.on("post", "/auth/register", (request) => this.handle(request));
  }

  private async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.registerUser.execute(this.toInput(request.body));
      return { statusCode: 201, body: output };
    } catch (error) {
      return this.toErrorResponse(error);
    }
  }

  private toInput(body: unknown): RegisterUserInput {
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
      throw new ApplicationError("Invalid request body");
    }
    const record = body as Record<string, unknown>;
    return {
      name: record.name as string,
      email: record.email as string,
      password: record.password as string,
    };
  }

  private toErrorResponse(error: unknown): HttpResponse {
    if (error instanceof UserAlreadyExistsError) {
      return { statusCode: 409, body: { error: { message: error.message } } };
    }
    if (error instanceof DomainError || error instanceof ApplicationError) {
      return { statusCode: 400, body: { error: { message: error.message } } };
    }
    throw error;
  }
}
