import { beforeEach, describe, expect, it } from "vitest";
import { DomainError } from "@shared/error/domain-error";
import { UserAlreadyExistsError } from "@/application/error/user-already-exists-error";
import { MockUserRepository } from "@/infra/repository/mock-user-repository";
import { RegisterUser, type RegisterUserInput } from "./register-user.js";

describe(RegisterUser.name, () => {
  let input: RegisterUserInput;
  let userRepository: MockUserRepository;
  let sut: RegisterUser;

  it("registers a user", async () => {
    const output = await sut.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      email: input.email,
      role: "CUSTOMER",
    });
  });

  it("rejects invalid name", async () => {
    const execute = () => sut.execute({ ...input, name: "" });
    await expect(execute()).rejects.toThrow(DomainError);
    await expect(execute()).rejects.toThrow("Name is required");
  });

  it("rejects invalid email", async () => {
    const execute = () => sut.execute({ ...input, email: "invalid" });
    await expect(execute()).rejects.toThrow(DomainError);
    await expect(execute()).rejects.toThrow("Invalid email");
  });

  it("rejects invalid password", async () => {
    const execute = () => sut.execute({ ...input, password: "short" });
    await expect(execute()).rejects.toThrow(DomainError);
    await expect(execute()).rejects.toThrow(
      "Password must be at least 8 characters",
    );
  });

  it("rejects existing email", async () => {
    await sut.execute(input);
    await expect(sut.execute(input)).rejects.toThrow(UserAlreadyExistsError);
  });

  beforeEach(() => {
    input = {
      name: "Gustave",
      email: "gustave@example.com",
      password: "secret123",
    };
    userRepository = new MockUserRepository();
    sut = new RegisterUser(userRepository);
  });
});
