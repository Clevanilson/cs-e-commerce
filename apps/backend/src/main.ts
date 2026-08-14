import { ExpressAdapter } from "@/modules/shared/http/express-adapter";

const http = new ExpressAdapter();

http.on("get", "/hello", () => ({
  statusCode: 200,
  body: { message: "Hello World" },
}));

void http.listen(3000);
