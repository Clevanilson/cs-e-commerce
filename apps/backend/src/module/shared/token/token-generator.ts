export type TokenPayload = {
  sub: string;
  role: string;
};

export interface TokenGenerator {
  generate(payload: TokenPayload): string;
}
