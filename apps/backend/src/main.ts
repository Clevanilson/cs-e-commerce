import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DB_DEFAULT_CONFIG } from "@shared/database/default-config";
import { PostgresAdapter } from "@shared/database/postgres-adapter";
import { ExpressAdapter } from "@shared/http/express-adapter";
import { JwtTokenGenerator } from "@shared/token/jwt-token-generator";
import { LoginUser } from "@/application/use-case/login-user";
import { RegisterUser } from "@/application/use-case/register-user";
import { UserController } from "@/infra/controller/user-controller";
import { PostgresUserRepository } from "@/infra/repository/postgres-user-repository";

async function main(): Promise<void> {
  const http = new ExpressAdapter();
  const database = new PostgresAdapter(DB_DEFAULT_CONFIG);
  await database.connect();
  const userRepository = new PostgresUserRepository(database);
  await userRepository.ensureSchema();
  new UserController(
    http,
    new RegisterUser(userRepository),
    new LoginUser(userRepository, new JwtTokenGenerator("secret")),
  );
  http.docs("/docs", loadOpenApi());
  await http.listen(3000);
}

function loadOpenApi(): Record<string, unknown> {
  const specPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "openapi.json",
  );
  return JSON.parse(readFileSync(specPath, "utf8")) as Record<string, unknown>;
}

void main();
