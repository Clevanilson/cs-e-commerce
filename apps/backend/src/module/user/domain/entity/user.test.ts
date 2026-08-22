import { beforeEach, describe, expect, it } from "vitest";
import { DomainError } from "@shared/error/domain-error";
import { User, type UserInput } from "./user.js";

describe(User.name, () => {
  let input: UserInput;
  let sut: User;

  it("creates a user", () => {
    expect(sut.id).toBeDefined();
    expect(sut.name).toBe(input.name);
    expect(sut.email).toBe(input.email);
    expect(sut.passwordMatches(input.password)).toBe(true);
    expect(sut.role).toBe("CUSTOMER");
    expect(sut.createdAt).toBeInstanceOf(Date);
    expect(sut.updatedAt).toBeInstanceOf(Date);
  });

  it("rejects invalid name", () => {
    const sut = () => new User({ ...input, name: "" });
    expect(sut).toThrow(DomainError);
    expect(sut).toThrow("Name is required");
  });

  it("rejects invalid email", () => {
    const sut = () => new User({ ...input, email: "invalid" });
    expect(sut).toThrow(DomainError);
    expect(sut).toThrow("Invalid email");
  });

  it("rejects invalid password", () => {
    const sut = () => new User({ ...input, password: "short" });
    expect(sut).toThrow(DomainError);
    expect(sut).toThrow("Password must be at least 8 characters");
  });

  it("rejects invalid role", () => {
    const sut = () => new User({ ...input, role: "GUEST" });
    expect(sut).toThrow(DomainError);
    expect(sut).toThrow("Invalid role");
  });

  it("rejects invalid id", () => {
    const sut = () => new User({ ...input, id: "not-a-uuid" });
    expect(sut).toThrow(DomainError);
    expect(sut).toThrow("Invalid id");
  });

  beforeEach(() => {
    input = {
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "secret123",
    };
    sut = new User(input);
  });
});
