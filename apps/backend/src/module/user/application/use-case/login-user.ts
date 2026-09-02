import { ApplicationError } from "@shared/error/application-error";
import type { TokenGenerator } from "@shared/token/token-generator";
import type { UserRepository } from "@/application/repository/user-repository";
import type { User } from "@/domain/entity/user";

export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    const user = await this.authenticate(input);
    return {
      name: user.name,
      token: this.tokenGenerator.generate({
        sub: user.id,
        role: user.role,
      }),
    };
  }

  private async authenticate(input: LoginUserInput): Promise<User> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user || !user.passwordMatches(input.password)) {
      throw new ApplicationError("Invalid credentials");
    }
    return user;
  }
}

export type LoginUserInput = {
  email: string;
  password: string;
};

export type LoginUserOutput = {
  name: string;
  token: string;
};
