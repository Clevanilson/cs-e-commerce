import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DB_DEFAULT_CONFIG } from "@shared/database/default-config";
import { PostgresAdapter } from "@shared/database/postgres-adapter";
import { ExpressAdapter } from "@shared/http/express-adapter";
import { RegisterUser } from "@/application/use-case/register-user";
import { PostgresUserRepository } from "@/infra/repository/postgres-user-repository";
import { RegisterController } from "@/infra/http/register-controller";

async function main(): Promise<void> {
  const http = new ExpressAdapter();
  const database = new PostgresAdapter(DB_DEFAULT_CONFIG);
  await database.connect();
  const userRepository = new PostgresUserRepository(database);
  await userRepository.ensureSchema();
  new RegisterController(http, new RegisterUser(userRepository));
  http.docs("/docs", loadOpenApi());
  await http.listen(3000);
}

function loadOpenApi(): Record<string, unknown> {
  const specPath = join(dirname(fileURLToPath(import.meta.url)), "openapi.json");
  return JSON.parse(readFileSync(specPath, "utf8")) as Record<string, unknown>;
}

void main();
