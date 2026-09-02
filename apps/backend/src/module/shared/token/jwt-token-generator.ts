import { createHmac } from "node:crypto";
import type { TokenGenerator, TokenPayload } from "@shared/token/token-generator";

export class JwtTokenGenerator implements TokenGenerator {
  constructor(private readonly secret: string) {}

  generate(payload: TokenPayload): string {
    const header = this.encode({ alg: "HS256", typ: "JWT" });
    const body = this.encode(payload);
    const signature = this.sign(`${header}.${body}`);
    return `${header}.${body}.${signature}`;
  }

  private encode(value: object): string {
    return Buffer.from(JSON.stringify(value)).toString("base64url");
  }

  private sign(data: string): string {
    return createHmac("sha256", this.secret).update(data).digest("base64url");
  }
}
