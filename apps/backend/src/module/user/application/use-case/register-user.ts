import { UserAlreadyExistsError } from "@/application/error/user-already-exists-error";
import type { UserRepository } from "@/application/repository/user-repository";
import { User } from "@/domain/entity/user";

export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const user = new User(input);
    await this.ensureEmailIsAvailable(user.email);
    await this.userRepository.save(user);
    return this.toOutput(user);
  }

  private async ensureEmailIsAvailable(email: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }
  }

  private toOutput(user: User): RegisterUserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterUserOutput = {
  id: string;
  name: string;
  email: string;
  role: string;
};
