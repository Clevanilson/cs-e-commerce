import type { HttpServer } from "@shared/http/http-server";
import type {
  RegisterUser,
  RegisterUserInput,
} from "@/application/use-case/register-user";

export class UserController {
  constructor(httpServer: HttpServer, registerUser: RegisterUser) {
    httpServer.on(
      "post",
      "/auth/register",
      (request) => registerUser.execute(request.body as RegisterUserInput),
      201,
    );
  }
}
