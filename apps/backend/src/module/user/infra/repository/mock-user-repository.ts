import type { UserRepository } from "@/application/repository/user-repository";
import type { User } from "@/domain/entity/user";

export class MockUserRepository implements UserRepository {
  readonly users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }
}
