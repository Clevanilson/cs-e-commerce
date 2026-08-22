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
  http.on("get", "/hello", () => ({
    statusCode: 200,
    body: { message: "Hello World" },
  }));
  await http.listen(3000);
}

void main();
