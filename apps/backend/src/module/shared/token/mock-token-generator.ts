import type { TokenGenerator, TokenPayload } from "@shared/token/token-generator";

export class MockTokenGenerator implements TokenGenerator {
  payload: TokenPayload | undefined;
  readonly token = "token";

  generate(payload: TokenPayload): string {
    this.payload = payload;
    return this.token;
  }
}
