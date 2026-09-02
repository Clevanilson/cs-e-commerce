import { beforeEach, describe, expect, it } from "vitest";
import type { TokenPayload } from "@/token/token-generator";
import { JwtTokenGenerator } from "./jwt-token-generator.js";

describe(JwtTokenGenerator.name, () => {
  const secret = "secret";
  let payload: TokenPayload;
  let sut: JwtTokenGenerator;

  it("generates a token with sub and role", () => {
    const token = sut.generate(payload);
    const encodedPayload = token.split(".")[1] ?? "";
    expect(JSON.parse(Buffer.from(encodedPayload, "base64url").toString())).toEqual({
      sub: payload.sub,
      role: payload.role,
    });
  });

  beforeEach(() => {
    payload = { sub: "user-id", role: "CUSTOMER" };
    sut = new JwtTokenGenerator(secret);
  });
});
