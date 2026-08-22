import { describe, expect, it } from "vitest";
import { DomainError } from "@shared/error/domain-error";
import { Password } from "./password.js";

describe(Password.name, () => {
  const validValues = ["secret123", "long-enough"];
  const invalidValues = ["short", ""];

  it.each(validValues)("accepts %s", (value) => {
    const sut = new Password(value);
    expect(sut.value).toMatch(/^\$argon2/);
    expect(sut.matches(value)).toBe(true);
  });

  it("accepts hashed values", () => {
    const hashedPassword = new Password("secret123");
    const sut = new Password(hashedPassword.value);
    expect(sut.value).toBe(hashedPassword.value);
    expect(sut.matches("secret123")).toBe(true);
  });

  it.each(invalidValues)("rejects %s", (value) => {
    const sut = () => new Password(value);
    expect(sut).toThrow(DomainError);
    expect(sut).toThrow("Password must be at least 8 characters");
  });
});
