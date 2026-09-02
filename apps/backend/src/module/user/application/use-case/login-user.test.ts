import { beforeEach, describe, expect, it } from "vitest";
import { ApplicationError } from "@shared/error/application-error";
import { MockTokenGenerator } from "@shared/token/mock-token-generator";
import { User } from "@/domain/entity/user";
import { MockUserRepository } from "@/infra/repository/mock-user-repository";
import { LoginUser, type LoginUserInput } from "./login-user.js";

describe(LoginUser.name, () => {
  let input: LoginUserInput;
  let user: User;
  let userRepository: MockUserRepository;
  let tokenGenerator: MockTokenGenerator;
  let sut: LoginUser;

  it("logs in a user", async () => {
    const output = await sut.execute(input);
    expect(output).toEqual({ name: user.name, token: tokenGenerator.token });
    expect(tokenGenerator.payload).toEqual({
      sub: user.id,
      role: user.role,
    });
  });

  it("rejects unknown email", async () => {
    const execute = () =>
      sut.execute({ ...input, email: "unknown@example.com" });
    await expect(execute()).rejects.toThrow(ApplicationError);
    await expect(execute()).rejects.toThrow("Invalid credentials");
  });

  it("rejects wrong password", async () => {
    const execute = () => sut.execute({ ...input, password: "wrong-password" });
    await expect(execute()).rejects.toThrow(ApplicationError);
    await expect(execute()).rejects.toThrow("Invalid credentials");
  });

  beforeEach(async () => {
    input = {
      email: "gustave@example.com",
      password: "secret123",
    };
    user = new User({
      name: "Gustave",
      email: input.email,
      password: input.password,
    });
    userRepository = new MockUserRepository();
    tokenGenerator = new MockTokenGenerator();
    await userRepository.save(user);
    sut = new LoginUser(userRepository, tokenGenerator);
  });
});
