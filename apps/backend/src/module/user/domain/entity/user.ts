import { Email } from "@/domain/value-object/email";
import { Id } from "@/domain/value-object/id";
import { Name } from "@/domain/value-object/name";
import { Password } from "@/domain/value-object/password";
import { Role } from "@/domain/value-object/role";

export type UserInput = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User {
  private readonly _id: Id;
  private readonly _name: Name;
  private readonly _email: Email;
  private readonly _password: Password;
  private readonly _role: Role;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(input: UserInput) {
    const now = new Date();
    this._id = input.id === undefined ? new Id() : new Id(input.id);
    this._name = new Name(input.name);
    this._email = new Email(input.email);
    this._password = new Password(input.password);
    this._role = input.role === undefined ? new Role() : new Role(input.role);
    this.createdAt = input.createdAt ?? now;
    this.updatedAt = input.updatedAt ?? now;
  }

  get id(): string {
    return this._id.value;
  }

  get name(): string {
    return this._name.value;
  }

  get email(): string {
    return this._email.value;
  }

  get password(): string {
    return this._password.value;
  }

  get role(): string {
    return this._role.value;
  }

  passwordMatches(plainText: string): boolean {
    return this._password.matches(plainText);
  }
}
