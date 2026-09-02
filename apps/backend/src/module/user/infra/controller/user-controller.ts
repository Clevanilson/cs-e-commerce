import type { HttpServer } from "@shared/http/http-server";
import type {
  LoginUser,
  LoginUserInput,
} from "@/application/use-case/login-user";
import type {
  RegisterUser,
  RegisterUserInput,
} from "@/application/use-case/register-user";

export class UserController {
  constructor(
    httpServer: HttpServer,
    registerUser: RegisterUser,
    loginUser: LoginUser,
  ) {
    httpServer.on(
      "post",
      "/auth/register",
      (request) => registerUser.execute(request.body as RegisterUserInput),
      201,
    );
    httpServer.on("post", "/auth/login", async (request, reply) => {
      const output = await loginUser.execute(request.body as LoginUserInput);
      reply.cookie("token", output.token, { httpOnly: true });
      return { name: output.name };
    });
  }
}
